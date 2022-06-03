import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductVariationService } from 'src/app/core/services/product-variation.service';
import { IProductVariation } from 'src/app/shared/interfaces/productVariation';

@Component({
  selector: 'app-add-edit-product-variation',
  templateUrl: './add-edit-product-variation.component.html',
  styleUrls: ['./add-edit-product-variation.component.css']
})
export class AddEditProductVariationComponent implements OnInit {

  pageTitle = 'Add Product Variation';
  variationForm: FormGroup;
  variation!: IProductVariation;
  errorMessage = '';
  private sub!: Subscription;
  companyID: number;
  productId: number;

  constructor(private fb: FormBuilder, 
    private service: ProductVariationService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.companyID = this.route.snapshot.params['companyID'];
    this.productId = this.route.snapshot.params['productId'];
    this.variationForm = this.fb.group({
      productionDate: [''],
      expirationDate: [''],
      amount: [''], 
    });
    
    this.sub = this.route.paramMap.subscribe(
      params => {
         const variationId = +params.get("productVariationId");
         this.getVariation(this.companyID, this.productId, variationId);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getVariation(companyID:number, productId: number, variationId:number): void {
    this.service.getVariation(companyID, productId, variationId).subscribe({
      next: (variation: IProductVariation) => this.displayVariation(variation),
      error: err => this.errorMessage = err
    });
  }

  displayVariation(variation: IProductVariation): void {
    if (this.variationForm) {
      this.variationForm.reset();
    }
    this.variation = variation;

    if (this.variation.productVariationId === 0){
      this.pageTitle = 'Add product variation';
    } else {
      this.pageTitle = `Edit product variation`;
    }

    this.variationForm.patchValue({
      productionDate: this.variation.productionDate,
      expirationDate: this.variation.expirationDate,
      amount: this.variation.amount,
      productId: this.productId
    });
  }

  save(): void {
    if (this.variationForm.valid) {
      if (this.variationForm.dirty) {
        const p = {...this.variation, ...this.variationForm.value};

        if (p.productVariationId === 0) {
          this.service.createVariation(this.companyID, p).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        } else {
          this.service.updateVariation(this.companyID, this.productId, p.productVariationId, p).subscribe({
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
    this.variationForm.reset();
    this.router.navigate(['companies', this.companyID, 'products', this.productId, 'variations']);
  }

}
