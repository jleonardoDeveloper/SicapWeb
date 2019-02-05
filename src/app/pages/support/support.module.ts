import { NgModule } from '@angular/core';
import { SupportComponent } from './support.component';
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
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SupportComponent
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
    FlexLayoutModule
  ]
})
export class SupportModule { }
