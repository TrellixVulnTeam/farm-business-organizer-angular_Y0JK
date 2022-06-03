import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditFarmComponent } from './add-edit-farm/add-edit-farm.component';
import { FarmComponent } from './farm.component';


@NgModule({
  imports: [RouterModule.forChild([
    {path: 'companies/:companyID/farms', component: FarmComponent },
    {path: 'companies/:companyID/farms/:farmId/edit', component: AddEditFarmComponent}
  ])],
  exports: [RouterModule]
})
export class FarmRoutingModule { }
