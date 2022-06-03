import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SidenavModule } from './sidenav/sidenav.module';
import { HeaderModule } from './header/header.module';


import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { DashboardModule } from '../dashboard/dashboard.module';
import { PageHeadlineModule } from './page-headline/page-headline.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SidenavModule,
    HeaderModule,
    DashboardModule,
    PageHeadlineModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    SidenavModule,
    HeaderModule,
    DashboardModule,
    PageHeadlineModule,

    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class SharedModule { }
