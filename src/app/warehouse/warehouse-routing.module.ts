import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCompanyComponent } from '../company/add-edit-company/add-edit-company.component';
import { AddEditWarehouseComponent } from './add-edit-warehouse/add-edit-warehouse.component';
import { WarehouseInventoryComponent } from './warehouse-inventory/warehouse-inventory.component';
import { WarehouseComponent } from './warehouse.component';


@NgModule({
  imports: [RouterModule.forChild([
    {path: 'companies/:companyID/warehouses', component: WarehouseComponent },
    {path: 'companies/:companyID/warehouses/:warehouseId/edit', component: AddEditWarehouseComponent},
    {path: 'companies/:companyID/warehouses/:warehouseId/inventory', component: WarehouseInventoryComponent}
  ])],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
