import { NgModule } from '@angular/core';
import { FarmRoutingModule } from './farm-routing.module';
import { FarmComponent } from './farm.component';
import { SharedModule } from '../shared/shared.module';
import { AddEditFarmComponent } from './add-edit-farm/add-edit-farm.component';


@NgModule({
  declarations: [
    FarmComponent,
    AddEditFarmComponent
  ],
  imports: [
    FarmRoutingModule,
    SharedModule,
  ],
  exports: [
    FarmComponent
  ]
})
export class FarmModule { }
