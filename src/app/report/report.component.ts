import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReportService } from '../core/services/report.service';
import { IReport } from '../shared/interfaces/report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  pageTitle = 'Reports';
  buttonText = "Add Report"
  reports: IReport[] = [];
  errorMessage: string = '';
  sub!: Subscription;
  companyID: number;
  farmId: number;


  constructor(private service: ReportService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.companyID = this.route.snapshot.params['companyID'];
    this.farmId = this.route.snapshot.params['farmId'];
    this.sub = this.service.getReports(this.companyID, this.farmId).subscribe({
      next: reports => this.reports = reports,
      error: err => this.errorMessage = err
    });
  }

  openForm(companyID: number, farmId: number, reportId:number) {
    if(farmId == 0){
      this.router.navigate(['/companies', companyID, 'farms', farmId, 'reports', 0, 'edit']);
    } else {
      this.router.navigate(['/companies', companyID, 'farms', farmId, 'reports', reportId, 'edit']);
    }
  }

  deleteReport(id: number): void {
    if (id === 0) {
      // Don't delete, it was never saved.
      this.router.navigate(['**']);
    } else if (id) {
      if (confirm(`Really delete the product`)) {
        this.service.deleteReport(this.companyID, this.farmId, id)
          .subscribe({
            next: () => this.router.navigate([this.router.url]),
            error: err => this.errorMessage = err
          });
      }
    }
  }



}
