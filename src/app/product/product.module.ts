import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from '../shared/shared.module';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';


@NgModule({
  declarations: [
    ProductComponent,
    AddEditProductComponent
  ],
  imports: [
    ProductRoutingModule,
    SharedModule
  ],
  exports: [ProductComponent, AddEditProductComponent]
})
export class ProductModule { }
