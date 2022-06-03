import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';


@NgModule({
  imports: [RouterModule.forChild([
    {path: 'invoices', component: InvoiceComponent },
    {path: 'invoices/:invoiceId/edit', component: InvoiceComponent}
  ])],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
