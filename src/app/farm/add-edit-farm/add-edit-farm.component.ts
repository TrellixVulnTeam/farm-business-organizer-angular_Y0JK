import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FarmService } from 'src/app/core/services/farm.service';
import { IFarm } from 'src/app/shared/interfaces/farm';

@Component({
  selector: 'app-add-edit-farm',
  templateUrl: './add-edit-farm.component.html',
  styleUrls: ['./add-edit-farm.component.css']
})
export class AddEditFarmComponent implements OnInit {

  pageTitle: string = 'Dodaj Farmu';
  farmForm: FormGroup;
  farm!: IFarm;
  errorMessage = '';
  private sub!: Subscription;
  companyID: number;

  constructor(private fb: FormBuilder, 
    private service: FarmService, 
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.companyID = this.route.snapshot.params['companyID'];
    this.farmForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      capacity: [''],
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
         const farmId = +params.get("farmId");
         this.getFarm(this.companyID, farmId);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getFarm(companyId:number, farmId: number): void {
    this.service.getFarm(companyId, farmId).subscribe({
      next: (farm: IFarm) => this.displayFarm(farm),
      error: err => this.errorMessage = err
    });
  }


  displayFarm(farm: IFarm): void {
    if (this.farmForm) {
      this.farmForm.reset();
    }
    this.farm = farm;

    if (this.farm.farmId === 0){
      this.pageTitle = 'Add Farm';
    } else {
      this.pageTitle = `Edit Farm: ${this.farm.name}`;
    }

    this.farmForm.patchValue({
      name: this.farm.name,
      description: this.farm.description,
      capacity: this.farm.capacity,
      companyID: this.companyID
    });
  }

  save(): void {
    if (this.farmForm.valid) {
      if (this.farmForm.dirty) {
        const p = {...this.farm, ...this.farmForm.value};

        if (p.farmId == 0) {
          this.service.createFarm(p).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        } else {
          this.service.updateFarm(this.companyID, p.farmId, p).subscribe({
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
    this.farmForm.reset();
    this.router.navigate(['/companies', this.companyID, 'farms']);
  }

}
