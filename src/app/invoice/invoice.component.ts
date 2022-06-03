import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InvoiceService } from '../core/services/invoice.service';
import { IInvoice } from '../shared/interfaces/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  pageTitle = 'Invoice Detail';
  
  invoices: IInvoice[] = [];

  errorMessage: string = '';
  sub!: Subscription;


  constructor(private service: InvoiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.service.getInvoices().subscribe({
      next: invoices => this.invoices = invoices,
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }
}
