import { NgModule } from '@angular/core';
import { AttendanceComponent } from './attendance.component';
import {  MatCardModule, 
          MatButtonModule, 
          MatGridListModule, 
          MatFormFieldModule, 
          MatIconModule, 
          MatInputModule, 
          MatDatepickerModule, 
          MatNativeDateModule, 
          MatTableModule, 
          MatPaginatorModule, 
          MatSortModule, 
          MatProgressSpinnerModule 
        } 
        from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AttendanceComponent
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ]
})
export class AttendanceModule { }
