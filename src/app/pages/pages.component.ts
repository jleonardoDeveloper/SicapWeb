import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MENU_ITEMS } from './pages-menu';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.sass']
})
export class PagesComponent {
  menuItems = MENU_ITEMS
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  constructor(private breakpointObserver: BreakpointObserver, private exitDialog:MatDialog) {}

  onButtonExitClick() : void {
    this.exitDialog.open(PagesExitDialogComponent);
  }
}

@Component({
  selector: 'pages-exit-dialog',
  templateUrl: './pages-exit-dialog.component.html',
  styleUrls: ['./pages-exit-dialog.component.sass'],
})
export class PagesExitDialogComponent {

  constructor(private exitDialogRef: MatDialogRef<PagesExitDialogComponent>) {}

  onButtonCancelClick() : void {
    this.exitDialogRef.close();
  }
  onButtonLogoutClick() {
    console.log("Debería ser cerrada la sesión con esta acción");
    this.exitDialogRef.close();
  }

}