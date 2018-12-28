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
          MatProgressSpinnerModule, 
          MatSelectModule,
          MatOptionModule
        } 
        from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AttendanceComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
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
