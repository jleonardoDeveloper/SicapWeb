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
    numeroDocumento : "",
    fechaInicio : "",
    fechaFin : "",
    codigoArea : ""
  }
  displayedColumns = ['nombreArea', 'nombreTrabajador', 'numeroDocumento', 'fechaMarcacion', 'horaIngreso', 'horaSalidaAlmuerzo', 'horaRetornoAlmuerzo', 'horaSalida'];

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
            tamanioPagina : this.paginator.pageSize,
            paginaActual : (this.paginator.pageIndex + 1),
            columnaOrden : this.sort.active,
            tipoOrden : this.sort.direction,
            numeroDocumento: this.filterOptions.numeroDocumento,
            fechaInicio: this.filterOptions.fechaInicio, 
            fechaFin: this.filterOptions.fechaFin
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
    return area ? area.nombreArea : undefined;
  }
  _filter(areaName : string): any[]{
    const filterValue = areaName.toLowerCase();
    return this.areas.filter(area => area.nombreArea.toLowerCase().indexOf(filterValue) === 0);
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
    this.filterOptions.fechaInicio = this.datepipe.transform(event.value,'dd/MM/yyyy');
  }
  onFinalDateChange(event: MatDatepickerInputEvent<Date>){
    this.filterOptions.fechaFin =  this.datepipe.transform(event.value,'dd/MM/yyyy');
  }
  onAreaSelectedChange(event: MatAutocompleteSelectedEvent){
    this.filterOptions.codigoArea = event.option.value.codigoArea;
  }
  //Methods
  loadAttendancesPage() {
    this.attendanceDataSource.loadAttendances({
      tamanioPagina : this.paginator.pageSize,
      paginaActual : (this.paginator.pageIndex + 1),
      columnaOrden : this.sort.active,
      tipoOrden : this.sort.direction,
      numeroDocumento: this.filterOptions.numeroDocumento,
      fechaInicio: this.filterOptions.fechaInicio, 
      fechaFin: this.filterOptions.fechaFin
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
  displayedColumns = ['fechaMarcacion', 'tipoMarcacion', 'hora', 'codigoPapeleta'];

  constructor( private attendanceService:AttendanceService ,private attendanceDetailDialogRef: MatDialogRef<AttendanceDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public attendance: any) {}

  ngOnInit(): void {
    this.globals.mapElements.areaPosition.latitude = +this.attendance.latitud;
    this.globals.mapElements.areaPosition.longitude = +this.attendance.longitud;
    this.attendanceDetailDataSource = new AttendanceDetailDataSource(this.attendanceService);
    this.attendanceDetailDataSource.loadAttendanceDetail({
      fechaMarcacion : this.attendance.fechaMarcacion,
      numeroDocumento : this.attendance.numeroDocumento
    });
  }

  onButtonCloseClick() : void {
    this.attendanceDetailDialogRef.close();
  }
  onAttendanceDetailRowClicked( row : any ) {
    this.globals.currentSelectedRow = row;
  }

}