import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';

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

  ngOnInit(): void {
    this.breakpoint =  calculateElementsInline(window.innerWidth);
  }

  onResize(event){
    this.breakpoint =  calculateElementsInline(event.target.innerWidth);
  }

  findByQuery(){
    console.log(this.query)
  }

}

function calculateElementsInline(innerWidth:number) {
    if(innerWidth < 360) return 1
    else if(innerWidth >= 360 && innerWidth <400) return 1
    else if(innerWidth >= 400 && innerWidth < 480) return 1
    else if(innerWidth >= 480 && innerWidth < 600)  return 2
    else if(innerWidth >= 600 && innerWidth < 720) return 2
    else if(innerWidth >= 720 && innerWidth < 840) return 2
    else if(innerWidth >= 840 && innerWidth < 960)  return 3
    else if(innerWidth >= 960 && innerWidth < 1024) return 3
    else if(innerWidth >= 1024 && innerWidth < 1280) return 3
    else if(innerWidth >= 1280 && innerWidth < 1440)  return 4
    else if(innerWidth >= 1440 && innerWidth < 1600)  return 4
    else if(innerWidth >= 1600 && innerWidth < 1920)  return 4
    else return 6
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

export class LessonsDataSource implements DataSource<Attendance> {

  private lessonsSubject = new BehaviorSubject<Attendance[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private coursesService: CoursesService) {}

  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
      return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.lessonsSubject.complete();
      this.loadingSubject.complete();
  }

  loadLessons(courseId: number, filter = '', sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

      this.loadingSubject.next(true);

      this.coursesService.findLessons(courseId, filter, sortDirection,
          pageIndex, pageSize).pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(lessons => this.lessonsSubject.next(lessons));
  }
}    
