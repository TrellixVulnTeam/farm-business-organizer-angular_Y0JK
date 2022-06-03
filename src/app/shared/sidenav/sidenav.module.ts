import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule

  ],
  exports: [
    SidenavComponent,
    MatSidenavModule
  ]
})
export class SidenavModule { }
