import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { AttendanceService } from 'src/app/data/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.sass']
})

export class AttendanceComponent implements OnInit {
  breakpoint: number
  query: Query = {
    vNumeroDocumento : "",
    dtFechaInicio : new Date(),
    dtFechaFin : new Date(),
    vCodigoArea : ""
  }

  areas = AREA_DATA
  displayedColumns: string[] = ['vNombreArea', 'vNombreTrabajador', 'vNumeroDocumento', 'dtFechaAsistencia', 'dtHoraIngreso', 'dtHoraSalidaAlmuerzo', 'dtHoraRetornoAlmuerzo', 'dtHoraSalida']
  attendanceDataSource = new MatTableDataSource<Attendance>(ATTENDANCE_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private attendanceService:AttendanceService){}

  ngOnInit(): void {
    this.attendanceDataSource.paginator = this.paginator;
  }

  findByQuery(){
    console.log(this.query)
  }

}

export interface Query{
  vNumeroDocumento: string,
  dtFechaInicio : Date,
  dtFechaFin : Date,
  vCodigoArea : string
}

export interface Attendance{
  vNombreArea:string,
  vNombreTrabajador: string,
  vNumeroDocumento: string,
  dtFechaAsistencia:string,
  dtHoraIngreso:string,
  dtHoraSalidaAlmuerzo:string,
  dtHoraRetornoAlmuerzo:string,
  dtHoraSalida:string
}

export interface Area{
  vCodigoArea: string,
  vNombreArea: string,
  vLatitud: string,
  vLongitud: string
}

const ATTENDANCE_DATA: Attendance[] = [
  { vNombreArea: 'DZ Lima', vNombreTrabajador: 'Julio Leonardo', vNumeroDocumento:'71528637', dtFechaAsistencia: '01/01/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ Lima', vNombreTrabajador: 'Julio Leonardo', vNumeroDocumento:'71528637', dtFechaAsistencia: '01/01/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ Lima', vNombreTrabajador: 'Julio Leonardo', vNumeroDocumento:'71528637', dtFechaAsistencia: '01/01/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ Lima', vNombreTrabajador: 'Julio Leonardo', vNumeroDocumento:'71528637', dtFechaAsistencia: '01/01/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ Cajamarca', vNombreTrabajador: 'Cesar Paredes', vNumeroDocumento:'71537840', dtFechaAsistencia: '27/06/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ Cajamarca', vNombreTrabajador: 'Cesar Paredes', vNumeroDocumento:'71537840', dtFechaAsistencia: '27/06/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ Cajamarca', vNombreTrabajador: 'Cesar Paredes', vNumeroDocumento:'71537840', dtFechaAsistencia: '27/06/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ Cajamarca', vNombreTrabajador: 'Cesar Paredes', vNumeroDocumento:'71537840', dtFechaAsistencia: '27/06/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ Cajamarca', vNombreTrabajador: 'Cesar Paredes', vNumeroDocumento:'71537840', dtFechaAsistencia: '27/06/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ La Libertad', vNombreTrabajador: 'Carlos Corta', vNumeroDocumento:'48285631', dtFechaAsistencia: '01/11/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ La Libertad', vNombreTrabajador: 'Carlos Corta', vNumeroDocumento:'48285631', dtFechaAsistencia: '01/11/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ La Libertad', vNombreTrabajador: 'Carlos Corta', vNumeroDocumento:'48285631', dtFechaAsistencia: '01/11/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ La Libertad', vNombreTrabajador: 'Carlos Corta', vNumeroDocumento:'48285631', dtFechaAsistencia: '01/11/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ La Libertad', vNombreTrabajador: 'Carlos Corta', vNumeroDocumento:'48285631', dtFechaAsistencia: '01/11/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ La Libertad', vNombreTrabajador: 'Carlos Corta', vNumeroDocumento:'48285631', dtFechaAsistencia: '01/11/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ La Libertad', vNombreTrabajador: 'Carlos Corta', vNumeroDocumento:'48285631', dtFechaAsistencia: '01/11/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ La Libertad', vNombreTrabajador: 'Carlos Corta', vNumeroDocumento:'48285631', dtFechaAsistencia: '01/11/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ Amazonas', vNombreTrabajador: 'Jean Valjean', vNumeroDocumento:'71522890', dtFechaAsistencia: '01/07/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ Amazonas', vNombreTrabajador: 'Jean Valjean', vNumeroDocumento:'71522890', dtFechaAsistencia: '01/07/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ Amazonas', vNombreTrabajador: 'Jean Valjean', vNumeroDocumento:'71522890', dtFechaAsistencia: '01/07/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' },
  { vNombreArea: 'DZ Amazonas', vNombreTrabajador: 'Jean Valjean', vNumeroDocumento:'71522890', dtFechaAsistencia: '01/07/2018', dtHoraIngreso : '07:45' ,dtHoraSalidaAlmuerzo: '13:05', dtHoraRetornoAlmuerzo: '13:55',dtHoraSalida : '17:53' }
];

const AREA_DATA :Area[] = [
  { vCodigoArea: '040201', vNombreArea: 'DZ Ancash', vLatitud: '-12.675436721', vLongitud:'-72.8883457394' },
  { vCodigoArea: '04020101', vNombreArea: 'AZ Recuay', vLatitud: '-12.675436721', vLongitud:'-72.8883457394' },
  { vCodigoArea: '04020102', vNombreArea: 'AZ Carhuaz', vLatitud: '-12.675436721', vLongitud:'-72.8883457394' },
  { vCodigoArea: '04020103', vNombreArea: 'AZ Bolognesi', vLatitud: '-12.675436721', vLongitud:'-72.8883457394' },
  { vCodigoArea: '040202', vNombreArea: 'DZ Lima', vLatitud: '-12.675436721', vLongitud:'-75.8883457394' }
] 