import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, takeUntil } from 'rxjs';
import { FarmService } from '../core/services/farm.service';
import { IFarm } from '../shared/interfaces/farm';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit {
  pageTitle = 'Farme';
  buttonText = 'Dodaj Farmu'
  farms: IFarm[] = [];
  errorMessage: string = '';
  sub!: Subscription;
  companyID: number;

  constructor(private farmService: FarmService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.companyID = this.route.snapshot.params['companyID'];

    this.sub = this.farmService.getFarms(this.companyID).subscribe({
      next: farms => this.farms = farms,
      error: err => this.errorMessage = err
    });
  }
  
  openReports(farmId:number) {
    this.router.navigate(['/companies', this.companyID, 'farms', farmId, 'reports']);
}

openForm(companyID: number, farmId: number) {
  if(farmId == 0){
    this.router.navigate(['/companies', companyID, 'farms', 0, 'edit']);
  } else {
    this.router.navigate(['/companies', companyID, 'farms', farmId, 'edit']);
  }
}

deleteFarm(id: number): void {
  if (id === 0) {
    // Don't delete, it was never saved.
    this.router.navigate(['**']);
  } else if (id) {
    if (confirm(`Really delete the product`)) {
      this.farmService.deleteFarm(this.companyID, id)
        .subscribe({
          next: () => this.router.navigate(['companies', this.companyID, 'farms']),
          error: err => this.errorMessage = err
        });
    }
  }
}

}
