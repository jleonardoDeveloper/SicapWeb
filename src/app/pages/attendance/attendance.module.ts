import { NgModule } from '@angular/core';
import { AttendanceComponent } from './attendance.component';
import { MatCardModule, MatButtonModule, MatGridListModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

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
    MatInputModule
  ]
})
export class AttendanceModule { }
