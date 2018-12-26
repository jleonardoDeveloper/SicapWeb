import { Component, OnInit } from '@angular/core';

export interface MenuItem {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = 'SicapWeb';
  menuItems:MenuItem[] =[
    {
      name:"Inicio",
      icon: "home",
      url:"/"
    },
    {
      name:"Asistencias",
      icon: "assignment_ind",
      url:"/"
    },
    {
      name:"Soporte",
      icon: "playlist_add_check",
      url:"/"
    },
    {
      name:"Reportes",
      icon: "bar_chart",
      url:"/"
    },
  ];
  ngOnInit() {
  }
}
