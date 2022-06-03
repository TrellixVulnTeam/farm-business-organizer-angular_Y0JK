import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ProductComponent } from './product.component';


@NgModule({
  imports: [RouterModule.forChild([
    {path: 'companies/:companyID/products', component: ProductComponent },
    {path: 'companies/:companyID/products/:productId/edit', component: AddEditProductComponent}
  ])],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
