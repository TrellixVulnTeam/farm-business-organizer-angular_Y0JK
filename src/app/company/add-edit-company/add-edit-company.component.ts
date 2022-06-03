import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/core/services/company.service';
import { ICompany } from 'src/app/shared/interfaces/company';

@Component({
  selector: 'app-add-edit-company',
  templateUrl: './add-edit-company.component.html',
  styleUrls: ['./add-edit-company.component.css']
})
export class AddEditCompanyComponent implements OnInit {

  pageTitle: string;
  companyForm: FormGroup;
  company!: ICompany;
  private sub: Subscription;
  errorMessage = '';

  constructor(private fb: FormBuilder, private service: CompanyService, private router: Router, private route: ActivatedRoute) {   }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idNumber: [''],
      pdvNumber: '',
      bankNumber: ''
    });


    this.sub = this.route.paramMap.subscribe(
      params => {
        const companyID = +params.get('companyID');
        this.getCompany(companyID);
      }
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  save(): void{
    if(this.companyForm.valid) {
      if(this.companyForm.dirty) {
        const p = {...this.company, ...this.companyForm.value};

        if(p.companyID == 0) {
          this.service.createCompany(p).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        } else {
          this.service.updateCompany(p).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the form errors.';
    }
  }

  getCompany(id: number): void {
    this.service.getCompany(id).subscribe({
      next: (company: ICompany) => this.displayCompany(company),
      error: err => this.errorMessage = err
    }); 
  }

  displayCompany(company: ICompany): void {
    if(this.companyForm) {
      this.companyForm.reset();
    }
    this.company = company;

    if (this.company.companyID === 0) {
      this.pageTitle = 'Add Company';
    } else {
      this.pageTitle = `Edit Company: ${this.company.name}`;
    }

    this.companyForm.patchValue({
      name: this.company.name,
      address: this.company.address,
      phone: this.company.phone,
      email: this.company.email,
      idNumber: this.company.idNumber,
      pdvNumber: this.company.pdvNumber,
      bankNumber: this.company.bankNumber
    });
  }


  onSaveComplete(): void {
    this.companyForm.reset();
    this.router.navigate(['/companies'])
  }

}
