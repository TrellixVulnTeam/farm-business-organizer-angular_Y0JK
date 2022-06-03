import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PartnerService } from 'src/app/core/services/partner.service';
import { IPartner } from 'src/app/shared/interfaces/partner';

@Component({
  selector: 'app-add-edit-partner',
  templateUrl: './add-edit-partner.component.html',
  styleUrls: ['./add-edit-partner.component.css']
})
export class AddEditPartnerComponent implements OnInit {

  pageTitle: string = 'Add Partner';
  partnerForm: FormGroup;
  partner!: IPartner;
  errorMessage = '';
  private sub!: Subscription;
  companyID: number;

  constructor(private fb: FormBuilder, 
    private service: PartnerService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.companyID = this.route.snapshot.params['companyID'];
    this.partnerForm = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      idNumber: [''],
      pdvNumber: [''],
      description: ['']
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
         const partnerId = +params.get("partnerId");
         this.getPartner(this.companyID, partnerId);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getPartner(companyId:number, partnerId: number): void {
    this.service.getPartner(companyId, partnerId).subscribe({
      next: (partner: IPartner) => this.displayPartner(partner),
      error: err => this.errorMessage = err
    });
  }

  displayPartner(partner: IPartner): void {
    if (this.partnerForm) {
      this.partnerForm.reset();
    }
    this.partner = partner;

    if (this.partner.partnerId === 0){
      this.pageTitle = 'Add partner';
    } else {
      this.pageTitle = `Edit partner: ${this.partner.name}`;
    }

    this.partnerForm.patchValue({
      name: this.partner.name,
      address: this.partner.address,
      idNumber: this.partner.idNumber,
      pdvNumber: this.partner.pdvNumber,
      description: this.partner.description,
      companyID: this.companyID
    });
  }

  save(): void {
    if (this.partnerForm.valid) {
      if (this.partnerForm.dirty) {
        const p = {...this.partner, ...this.partnerForm.value};

        if (p.partnerId == 0) {
          this.service.createPartner(p).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        } else {
          this.service.updatePartner(this.companyID, p.partnerId, p).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        }
      }else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the form errors.';
    }
  }

  onSaveComplete(): void {
    this.partnerForm.reset();
    this.router.navigate(['/companies', this.companyID, 'partners']);
  }


}
