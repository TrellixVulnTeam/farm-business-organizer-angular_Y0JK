import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WarehouseComponent } from './warehouse.component';
import { AddEditWarehouseComponent } from './add-edit-warehouse/add-edit-warehouse.component';
import { WarehouseInventoryComponent } from './warehouse-inventory/warehouse-inventory.component';



@NgModule({
  declarations: [WarehouseComponent, AddEditWarehouseComponent, WarehouseInventoryComponent],
  imports: [
    WarehouseRoutingModule,
    SharedModule
  ],
  exports: [WarehouseComponent, AddEditWarehouseComponent]
})
export class WarehouseModule { }
