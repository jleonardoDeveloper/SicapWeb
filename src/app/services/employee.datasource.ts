import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AttendanceService } from 'src/app/services/attendance.service';

export class EmployeeDataSource implements DataSource<any>{

  private employeesSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public globalResponseParameters = {
    iRecordCount: 0,
    iPageCount: 0,
    iPageNumber: 0,
    cNumeroDocumento : "",
    vCodigoArea : "",
    vNombreTrabajador : ""
  }

  constructor(private attendanceService: AttendanceService) {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.employeesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.employeesSubject.complete();
    this.loadingSubject.complete();
  }

  loadEmployees(query:any) {
    this.loadingSubject.next(true);
    this.attendanceService.getEmployees(query).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(
      response => {
        this.employeesSubject.next(response)
        this.globalResponseParameters.iRecordCount = response.length > 0 ? response[0].iRecordCount : 0;
        this.globalResponseParameters.iPageCount = response.length > 0 ? response[0].iPageCount : 0;
        this.globalResponseParameters.iPageNumber = response.length > 0 ? response[0].iPageNumber : 0;
      }
    );
  } 
}
  