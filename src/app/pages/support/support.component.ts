import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';
import { EmployeeDataSource } from 'src/app/services/employee.datasource';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.sass']
})
export class SupportComponent implements OnInit, AfterViewInit {
  //Employee
  filterOptions = {
    cNumeroDocumento : "",
    vCodigoArea : "",
    vNombreTrabajador : ""
  };
  areas : any[];
  areaFilteredOptions:Observable<any[]>;
  areaInputFormControl : FormControl = new FormControl();
  employeeDataSource : EmployeeDataSource;
  employeeDisplayedColumns = ['vNombreArea', 'vNombreTrabajador', 'cNumeroDocumento'];
  @ViewChild('employeeSort') employeeSort : MatSort;
  @ViewChild('employeePaginator') employeePaginator : MatPaginator;
  //Data source of attendances
  attendanceDataSource : any;
  attendanceDisplayedColumns = ['dtFechaMarcacion', 'tHoraIngreso', 'tHoraSalidaAlmuerzo', 'tHoraRetornoAlmuerzo', 'tHoraSalida','vAcciones'];

  constructor(private attendanceService:AttendanceService) { }

  ngOnInit() {
    this.employeeDataSource = new EmployeeDataSource(this.attendanceService);
    this.attendanceService.getAreas({})
      .subscribe(
        (response) => {
          this.areas = response
          this.areaFilteredOptions = this.areaInputFormControl.valueChanges
          .pipe(
            startWith<string | any>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.areas.slice())
          );
        },
        (error) => console.log(error),
        () => {
          this.employeeDataSource.loadEmployees({
            iPageSize : this.employeePaginator.pageSize,
            iPageNumber : (this.employeePaginator.pageIndex + 1),
            vSortColumn : this.employeeSort.active,
            vSortOrder : this.employeeSort.direction
          });
        }
      );
  }

  ngAfterViewInit(): void {
    this.employeeSort.sortChange.subscribe(
      () => {
        this.employeePaginator.pageIndex = 0;
        this.loadEmployeesPage();
      }
    )
  }

  //Helpers
  _filter(areaName : string): any[]{
    const filterValue = areaName.toLowerCase();
    return this.areas.filter(area => area.vNombreArea.toLowerCase().indexOf(filterValue) === 0);
  }
  //Events
  onClickSearchButton(){
    this.loadEmployeesPage();
  }
  onEmployeeTablePaginatorChange(){
    this.loadEmployeesPage();
  }
  //Methods
  loadEmployeesPage(){
    this.employeeDataSource.loadEmployees({
      iPageSize : this.employeePaginator.pageSize,
      iPageNumber : (this.employeePaginator.pageIndex + 1),
      vSortColumn : this.employeeSort.active,
      vSortOrder : this.employeeSort.direction,
      cNumeroDocumento : this.filterOptions.cNumeroDocumento,
      vCodigoArea : this.filterOptions.vCodigoArea,
      vNombreTrabajador : this.filterOptions.vNombreTrabajador
    });
  }

}
