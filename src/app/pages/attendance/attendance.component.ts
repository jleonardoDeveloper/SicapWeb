import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatAutocompleteSelectedEvent, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AttendanceService } from 'src/app/services/attendance.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AttendanceDataSource } from 'src/app/services/attendance.datasource';
import { AttendanceDetailDataSource } from 'src/app/services/attendance-detail.datasource';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.sass'],
  providers: [DatePipe]
})

export class AttendanceComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //values
  areaInputFormControl : FormControl = new FormControl();
  areaFilteredOptions:Observable<any[]>
  areas : any[]
  attendanceDataSource : AttendanceDataSource;
  filterOptions = {
    cNumeroDocumento : "",
    dtFechaInicio : "",
    dtFechaFin : "",
    vCodigoArea : ""
  }
  displayedColumns = ['vNombreArea', 'vNombreTrabajador', 'cNumeroDocumento', 'dtFechaMarcacion', 'tHoraIngreso', 'tHoraSalidaAlmuerzo', 'tHoraRetornoAlmuerzo', 'tHoraSalida'];

  constructor(private attendanceService:AttendanceService, private datepipe: DatePipe, private attendanceDetailDialog:MatDialog){}

  ngOnInit(): void {
    this.attendanceDataSource = new AttendanceDataSource(this.attendanceService);
    this.attendanceService.getAreas({})
      .subscribe(
        (response) => 
          {
            this.areas = response
            this.areaFilteredOptions = this.areaInputFormControl.valueChanges
            .pipe(
              startWith<string | any>(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this._filter(name) : this.areas.slice())
            );
          },
        (err) => console.error(err),
        () => {
          this.attendanceDataSource.loadAttendances({
            iPageSize : this.paginator.pageSize,
            iPageNumber : (this.paginator.pageIndex + 1),
            vSortColumn : this.sort.active,
            vSortOrder : this.sort.direction,
            //temp values for dev
            cNumeroDocumento:'33254002',
            dtFechaInicio:'1/11/2018', 
            dtFechaFin:'30/12/2018'
          });
        }
      );
  }
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(
      () => {
        this.paginator.pageIndex = 0;
        this.loadAttendancesPage();
      }
    );
  }
  //Helpers
  _showAreaInForm(area?: any): string | undefined {
    return area ? area.vNombreArea : undefined;
  }
  _filter(areaName : string): any[]{
    const filterValue = areaName.toLowerCase();
    return this.areas.filter(area => area.vNombreArea.toLowerCase().indexOf(filterValue) === 0);
  }
  //Events
  onPaginatorChange(){
    this.loadAttendancesPage();
  }
  onRowClicked(row:any) {
    this.attendanceDetailDialog.open(AttendanceDetailDialogComponent, { 
      width:'80%', 
      data: row 
    });
  }
  onClickSearchButton(){
    this.loadAttendancesPage();
  }
  onInitialDateChange(event: MatDatepickerInputEvent<Date>){
    this.filterOptions.dtFechaInicio = this.datepipe.transform(event.value,'dd/MM/yyyy');
  }
  onFinalDateChange(event: MatDatepickerInputEvent<Date>){
    this.filterOptions.dtFechaFin =  this.datepipe.transform(event.value,'dd/MM/yyyy');
  }
  onAreaSelectedChange(event: MatAutocompleteSelectedEvent){
    this.filterOptions.vCodigoArea = event.option.value.vCodigoArea;
  }
  //Methods
  loadAttendancesPage() {
    this.attendanceDataSource.loadAttendances({
      iPageSize : this.paginator.pageSize,
      iPageNumber : (this.paginator.pageIndex + 1),
      vSortColumn : this.sort.active,
      vSortOrder : this.sort.direction,
      cNumeroDocumento:this.filterOptions.cNumeroDocumento,
      dtFechaInicio:this.filterOptions.dtFechaInicio,
      dtFechaFin:this.filterOptions.dtFechaFin
    });
  }
}

@Component({
  selector: 'attendance-detail-dialog',
  templateUrl: './attendance-detail-dialog.component.html',
  styleUrls: ['./attendance-detail-dialog.component.sass'],
})
export class AttendanceDetailDialogComponent implements OnInit {
  globals = {
    mapElements : {
      areaPosition : {
        latitude: 0.0,
        longitude : 0.0
      },
      attendancesPositionMarkers:[]
    },
    currentSelectedRow : null
  }

  attendanceDetailDataSource : AttendanceDetailDataSource;
  displayedColumns = ['dtFechaMarcacion', 'vTipoMarcacion', 'tHora', 'vCodigoPapeleta'];

  constructor( private attendanceService:AttendanceService ,private attendanceDetailDialogRef: MatDialogRef<AttendanceDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public attendance: any) {}

  ngOnInit(): void {
    this.globals.mapElements.areaPosition.latitude = +this.attendance.vLatitud;
    this.globals.mapElements.areaPosition.longitude = +this.attendance.vLongitud;
    this.attendanceDetailDataSource = new AttendanceDetailDataSource(this.attendanceService);
    this.attendanceDetailDataSource.loadAttendanceDetail({
      dtFechaMarcacion : this.attendance.dtFechaMarcacion,
      cNumeroDocumento : this.attendance.cNumeroDocumento
    });
  }

  onButtonCloseClick() : void {
    this.attendanceDetailDialogRef.close();
  }
  onAttendanceDetailRowClicked( row : any ) {
    this.globals.currentSelectedRow = row;
  }

}