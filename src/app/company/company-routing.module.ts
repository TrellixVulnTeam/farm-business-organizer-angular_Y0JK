import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCompanyComponent } from './add-edit-company/add-edit-company.component';
import { CompanyComponent } from './company.component';



@NgModule({
  imports: [RouterModule.forChild([
    {path: 'companies', component: CompanyComponent},
    {path: 'companies/:companyID/edit', component: AddEditCompanyComponent } 
  ])],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
