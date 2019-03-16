import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AttendanceService } from 'src/app/services/attendance.service';

export class AttendanceDataSource implements DataSource<any>{

  private attendancesSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public globalResponseParameters = {
    contadorRegistros: 0,
    contadorPaginas: 0,
    paginaActual: 0,
    numeroDocumento : "",
    fechaInicio : "",
    fechaFin : "",
    codigoArea : ""
  }

  constructor(private attendanceService: AttendanceService) {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.attendancesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.attendancesSubject.complete();
    this.loadingSubject.complete();
  }

  loadAttendances(query:any) {
    this.loadingSubject.next(true);
    this.attendanceService.getAttendances(query).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(
      response => {
        this.attendancesSubject.next(response)
        this.globalResponseParameters.contadorRegistros = response.length > 0 ? response[0].contadorRegistros : 0;
        this.globalResponseParameters.contadorPaginas = response.length > 0 ? response[0].contadorPaginas : 0;
        this.globalResponseParameters.paginaActual = response.length > 0 ? response[0].paginaActual : 0;
      }
    );
  } 
}
  