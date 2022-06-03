import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditReportComponent } from './add-edit-report/add-edit-report.component';
import { ReportComponent } from './report.component';


@NgModule({
  imports: [RouterModule.forChild([
    {path: 'companies/:companyID/farms/:farmId/reports', component: ReportComponent },
    {path: 'companies/:companyID/farms/:farmId/reports/:reportId/edit', component: AddEditReportComponent}
  ])],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
