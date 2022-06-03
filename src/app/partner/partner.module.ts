import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from './partner.component';
import { PartnerRoutingModule } from './partner-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddEditPartnerComponent } from './add-edit-partner/add-edit-partner.component';



@NgModule({
  declarations: [
    PartnerComponent,
    AddEditPartnerComponent
  ],
  imports: [
    PartnerRoutingModule,
    SharedModule
  ],
  exports: [PartnerComponent, AddEditPartnerComponent]
})
export class PartnerModule { }
