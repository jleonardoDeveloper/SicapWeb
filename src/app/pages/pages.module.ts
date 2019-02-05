import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Material UI
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { MatButtonModule, MatDialogModule } from '@angular/material';
//Main Component
import { PagesComponent,PagesExitDialogComponent } from './pages.component';
//Modules
import { AttendanceModule } from './attendance/attendance.module';
import { SupportModule } from './support/support.module';
import { ReportModule } from './report/report.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    PagesComponent,
    PagesExitDialogComponent
  ],
  entryComponents : [
    PagesComponent,
    PagesExitDialogComponent
  ],
  imports: [
    //Routing Module
    PagesRoutingModule,
    //Material UI
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    //Modules
    DashboardModule,
    AttendanceModule,
    SupportModule,
    ReportModule,
    CommonModule
  ]
})
export class PagesModule { }
