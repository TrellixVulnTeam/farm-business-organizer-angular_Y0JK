import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditProductVariationComponent } from './add-edit-product-variation/add-edit-product-variation.component';
import { ProductVariationComponent } from './product-variation.component';


@NgModule({
  imports: [RouterModule.forChild([
    {path: 'companies/:companyID/products/:productId/variations', component: ProductVariationComponent },
    {path: 'companies/:companyID/products/:productId/variations/:productVariationId/edit', component: AddEditProductVariationComponent}
  ])],
  exports: [RouterModule]
})
export class ProductVariationRoutingModule { }
