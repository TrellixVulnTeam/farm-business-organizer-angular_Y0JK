import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PartnerService } from '../core/services/partner.service';
import { IPartner } from '../shared/interfaces/partner';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  pageTitle = 'Partners';
  buttonText = 'Add Partner'
  partners: IPartner[] = [];
  errorMessage: string = '';
  sub!: Subscription;
  companyID: number;

  displayedColumns: string[] = ['partnerId', 'name', 'address', 'idNumber', 'pdvNumber', 'description', 'Buttons'];


  constructor(private service: PartnerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.companyID = this.route.snapshot.params['companyID'];
    this.sub = this.service.getPartners(this.companyID).subscribe({
      next: partners => this.partners = partners,
      error: err => this.errorMessage = err
    });
  }


  //TODO
  openInvoices(partnerId:number) {
    this.router.navigate(['/companies', this.companyID, 'parners', partnerId, 'invoices']);
}

openForm(partnerId: number) {
  if(partnerId == 0){
    this.router.navigate(['/companies', this.companyID, 'partners', 0, 'edit']);
  } else {
    this.router.navigate(['/companies', this.companyID, 'partners', partnerId, 'edit']);
  }
}

deletePartner(id: number): void {
  if (id === 0) {
    // Don't delete, it was never saved.
    this.router.navigate(['**']);
  } else if (id) {
    if (confirm(`Really delete the product`)) {
      this.service.deletePartner(this.companyID, id)
        .subscribe({
          next: () => this.router.navigate(['companies', this.companyID, 'partners']),
          error: err => this.errorMessage = err
        });
    }
  }
}


}
