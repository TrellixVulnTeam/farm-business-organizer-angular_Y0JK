import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddEditPartnerComponent } from './add-edit-partner/add-edit-partner.component';
import { PartnerComponent } from './partner.component';


@NgModule({
  imports: [RouterModule.forChild([
    {path: 'companies/:companyID/partners', component: PartnerComponent },
    {path: 'companies/:companyID/partners/:partnerId/edit', component: AddEditPartnerComponent}
  ])],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }
