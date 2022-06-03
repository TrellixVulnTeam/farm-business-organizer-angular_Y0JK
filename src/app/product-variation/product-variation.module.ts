import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductVariationRoutingModule } from './product-variation-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductVariationComponent } from './product-variation.component';
import { AddEditProductVariationComponent } from './add-edit-product-variation/add-edit-product-variation.component';



@NgModule({
  declarations: [ProductVariationComponent, AddEditProductVariationComponent],
  imports: [
    ProductVariationRoutingModule,
    SharedModule
  ],
  exports: [ProductVariationComponent, AddEditProductVariationComponent]
})
export class ProductVariationModule { }
