import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.sass']
})

export class AttendanceComponent implements OnInit {
  breakpoint: number

  ngOnInit(): void {
    this.breakpoint =  calculateElementsInline(window.innerWidth);
  }

  onResize(event){
    this.breakpoint =  calculateElementsInline(event.target.innerWidth);
  }

}

function calculateElementsInline(innerWidth:number) {
    if(innerWidth < 360) return 1
    else if(innerWidth >= 360 && innerWidth <400) return 1
    else if(innerWidth >= 400 && innerWidth < 480) return 1
    else if(innerWidth >= 480 && innerWidth < 600)  return 2
    else if(innerWidth >= 600 && innerWidth < 720) return 3
    else if(innerWidth >= 720 && innerWidth < 840) return 3
    else if(innerWidth >= 840 && innerWidth < 960)  return 4
    else if(innerWidth >= 960 && innerWidth < 1024) return 4
    else if(innerWidth >= 1024 && innerWidth < 1280) return 6
    else if(innerWidth >= 1280 && innerWidth < 1440)  return 6
    else if(innerWidth >= 1440 && innerWidth < 1600)  return 8
    else if(innerWidth >= 1600 && innerWidth < 1920)  return 8
    else return 10
}
