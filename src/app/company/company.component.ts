import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompanyService } from '../core/services/company.service';
import { ICompany } from '../shared/interfaces/company';
import {MatDialog} from '@angular/material/dialog';
import { AddEditCompanyComponent } from './add-edit-company/add-edit-company.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  pageTitle: string = 'Companies';
  buttonText = 'Add comapny'
  companies: ICompany[] = [];
  errorMessage: string = '';
  private sub!: Subscription;

  constructor(private companyService: CompanyService, private router: Router) { }
  
  ngOnInit(): void {

    this.sub = this.companyService.getCompanies().subscribe({
      next: companies => this.companies = companies,
      error: err => this.errorMessage = err
    });
  }

  openForm(id: number) {
    if(id == 0){
      this.router.navigate(['/companies', 0, 'edit']);
    } else {
      this.router.navigate(['/companies', id, 'edit']);
    }
  }

  openFarms(id: number) {
    this.router.navigate(['/companies', id, 'farms']);
  }
  openProducts(id: number) {
    this.router.navigate(['/companies', id, 'products']);
  }

  openWarehouses(id: number) {
    this.router.navigate(['/companies', id, 'warehouses']);
  }

  openPartners(id: number) {
    this.router.navigate(['/companies', id, 'partners']);
  }


  deleteCompany(id: number): void {
    if (id === 0) {
      // Don't delete, it was never saved.
      this.router.navigate(['**']);
    } else if (id) {
      if (confirm(`Really delete the product`)) {
        this.companyService.deleteCompany(id)
          .subscribe({
            next: () => this.router.navigate(['/companies']),
            error: err => this.errorMessage = err
          });
      }
    }
  }

}
