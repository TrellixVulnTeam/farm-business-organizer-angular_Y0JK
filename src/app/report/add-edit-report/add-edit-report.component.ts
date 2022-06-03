import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReportService } from 'src/app/core/services/report.service';
import { IReport } from 'src/app/shared/interfaces/report';

@Component({
  selector: 'app-add-edit-report',
  templateUrl: './add-edit-report.component.html',
  styleUrls: ['./add-edit-report.component.css']
})
export class AddEditReportComponent implements OnInit {

  pageTitle = 'Add Report';
  reportForm: FormGroup;
  report!: IReport;
  errorMessage = '';
  private sub!: Subscription;
  companyID: number;
  farmId: number;
  

  constructor(private fb: FormBuilder, 
    private service: ReportService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.companyID = this.route.snapshot.params['companyID'];
    this.farmId = this.route.snapshot.params['farmId'];
    this.reportForm = this.fb.group({
      name: ['', Validators.required],
      madeOn: [''],
      eggProduction: [''],
      deaths: [''],
      vitamins: [''],
      foodAmount: [''],
      coefficient: [''],
      
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
         const reportId = +params.get("reportId");
         this.getReport(this.companyID, this.farmId, reportId);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getReport(companyID:number, farmId: number, reportId:number): void {
    this.service.getReport(companyID, farmId, reportId).subscribe({
      next: (report: IReport) => this.displayReport(report),
      error: err => this.errorMessage = err
    });
  }

  displayReport(report: IReport): void {
    if (this.reportForm) {
      this.reportForm.reset();
    }
    this.report = report;

    if (this.report.reportId === 0){
      this.pageTitle = 'Add report';
    } else {
      this.pageTitle = `Edit report: ${this.report.name}`;
    }

    this.reportForm.patchValue({
      name: this.report.name,
      madeOn: this.report.madeOn,
      eggProduction: this.report.eggProduction,
      deaths: this.report.deaths,
      vitamins: this.report.vitamins,
      foodAmount: this.report.foodAmount,
      coefficient: this.report.coefficient,
      farmId: this.farmId
    });
  }

  save(): void {
    if (this.reportForm.valid) {
      if (this.reportForm.dirty) {
        const p = {...this.report, ...this.reportForm.value};

        if (p.reportId === 0) {
          this.service.createReport(this.companyID, p).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        } else {
          this.service.updateReport(this.companyID, this.farmId, p.reportId, p).subscribe({
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
    this.reportForm.reset();
    this.router.navigate(['companies', this.companyID, 'farms', this.farmId, 'reports']);
  }

}
