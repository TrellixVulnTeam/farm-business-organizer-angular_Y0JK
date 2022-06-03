import { NgModule } from '@angular/core';
import { InvoiceComponent } from './invoice.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    InvoiceRoutingModule,
    SharedModule
  ],
  exports: [InvoiceComponent]
})
export class InvoiceModule { }
