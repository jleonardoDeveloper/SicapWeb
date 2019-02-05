import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AttendanceService } from 'src/app/services/attendance.service';

export class AttendanceDetailDataSource implements DataSource<any>{

  private attendanceDetailSubject = new BehaviorSubject<any[]>([]);
  private markersSubject = new BehaviorSubject<any[]>([]);
  public markers$ = this.markersSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  constructor(private attendanceService: AttendanceService) {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.attendanceDetailSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.attendanceDetailSubject.complete();
    this.loadingSubject.complete();
    this.markersSubject.complete();
  }

  loadAttendanceDetail(query:any) {
    this.loadingSubject.next(true);
    this.markersSubject.next([]);
    this.attendanceService.getAttendanceDetail(query)
    .pipe(
      catchError(() => of([])),
      finalize(() => {
        this.loadingSubject.next(false)
      })
    ).subscribe(
      response => {
        this.attendanceDetailSubject.next(response)
        var marksArray = [];
        for (let attendanceDetail of response) {
          marksArray.push({
            latitude: +attendanceDetail.vLatitud,
            longitude: +attendanceDetail.vLongitud
          })
        }
        this.markersSubject.next(marksArray)
      }
    );
  } 
}
  