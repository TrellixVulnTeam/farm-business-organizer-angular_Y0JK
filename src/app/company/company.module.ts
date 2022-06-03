import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';

import { AddEditCompanyComponent } from './add-edit-company/add-edit-company.component';


@NgModule({
  declarations: [
    CompanyComponent,
    AddEditCompanyComponent
  ],
  imports: [
    CompanyRoutingModule,
    SharedModule
    
  ],
  exports: [CompanyComponent, AddEditCompanyComponent]
})
export class CompanyModule { }
