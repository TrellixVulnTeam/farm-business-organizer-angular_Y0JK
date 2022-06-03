import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WarehouseService } from 'src/app/core/services/warehouse.service';
import { IWarehouse } from 'src/app/shared/interfaces/warehouse';

@Component({
  selector: 'app-add-edit-warehouse',
  templateUrl: './add-edit-warehouse.component.html',
  styleUrls: ['./add-edit-warehouse.component.css']
})
export class AddEditWarehouseComponent implements OnInit {

  pageTitle: string = 'Add Farm';
  form: FormGroup;
  warehouse!: IWarehouse;
  errorMessage = '';
  private sub!: Subscription;
  companyID: number;

  constructor(private fb: FormBuilder, 
    private service: WarehouseService, 
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      this.companyID = this.route.snapshot.params['companyID'];
      this.form = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        capacity: [''],
      });
  
      this.sub = this.route.paramMap.subscribe(
        params => {
           const warehouseId = +params.get("warehouseId");
           this.getWarehouse(this.companyID, warehouseId);
        });
    }
    
    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }

    getWarehouse(companyId:number, warehouseId: number): void {
      this.service.getWarehouse(companyId, warehouseId).subscribe({
        next: (warehouse: IWarehouse) => this.displayWarehouse(warehouse),
        error: err => this.errorMessage = err
      });
    }

    displayWarehouse(warehouse: IWarehouse): void {
      if (this.form) {
        this.form.reset();
      }
      this.warehouse = warehouse;
  
      if (this.warehouse.warehouseId === 0){
        this.pageTitle = 'Add warehouse';
      } else {
        this.pageTitle = `Edit warehouse: ${this.warehouse.name}`;
      }
  
      this.form.patchValue({
        name: this.warehouse.name,
        description: this.warehouse.description,
        capacity: this.warehouse.capacity,
        companyID: this.companyID
      });
    }

    save(): void {
      if (this.form.valid) {
        if (this.form.dirty) {
          const p = {...this.warehouse, ...this.form.value};
  
          if (p.warehouseId == 0) {
            this.service.createWarehouse(p).subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
          } else {
            this.service.updateWarehouse(this.companyID, p.warehouseId, p).subscribe({
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
      this.form.reset();
      this.router.navigate(['/companies', this.companyID, 'warehouses']);
    }

}
