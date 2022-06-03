import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddEditReportComponent } from './add-edit-report/add-edit-report.component';



@NgModule({
  declarations: [
    ReportComponent,
    AddEditReportComponent
  ],
  imports: [
    ReportRoutingModule,
    SharedModule
  ],
  exports: [ReportComponent, AddEditReportComponent]
})
export class ReportModule { }
