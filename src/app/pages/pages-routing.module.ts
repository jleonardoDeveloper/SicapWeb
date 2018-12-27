import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { SupportComponent } from './support/support.component';
import { ReportComponent } from './report/report.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: PagesComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'attendance',
        component:AttendanceComponent
      },
      {
        path:'support',
        component:SupportComponent
      },
      {
        path:'report',
        component:ReportComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
