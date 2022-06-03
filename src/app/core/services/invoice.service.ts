import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInvoice } from 'src/app/shared/interfaces/invoice';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseApiService {

  constructor(override readonly http:HttpClient) { 
    super(http);
  }

  getInvoices():Observable<IInvoice[]> {
    return this.get<IInvoice[]>(this.url + `/invoices`);
  }

  getInvoice(invoiceId:number){
    return this.get<IInvoice>(this.url + `/invoices/${invoiceId}`);
  }

  createInvoice(invoice: IInvoice){
    return this.post(this.url + `/invoices`, invoice);
  }

  updateInvoice(invoiceId:number, invoice: IInvoice){
    return this.put(this.url + `/invoices/${invoiceId}`, invoice);
  }

  deleteInvoice(invoiceId:number){
    return this.delete(this.url + `/invoices/${invoiceId}`);
  }
}
