import { NgModule } from '@angular/core';
import { AttendanceComponent, AttendanceDetailDialogComponent } from './attendance.component';
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
          MatOptionModule,
          MatAutocompleteModule,
          MatDialogModule
        } 
        from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  entryComponents : [
    AttendanceComponent,
    AttendanceDetailDialogComponent
  ],
  declarations: [
    AttendanceComponent,
    AttendanceDetailDialogComponent
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
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDialogModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBNMcP7vQ11WbRoVMCsCwJgXXc9f2VvL_E'
    })
  ]
})
export class AttendanceModule { }
