import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  pageTitle: string = 'Add Product';
  productForm: FormGroup;
  product!: IProduct;
  errorMessage = '';
  private sub!: Subscription;
  companyID: number;
  constructor(private fb: FormBuilder, 
    private service: ProductService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.companyID = this.route.snapshot.params['companyID'];
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      barcode: [''],
      description: ['']
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
         const productId = +params.get("productId");
         this.getProduct(this.companyID, productId);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getProduct(companyId:number, productId: number): void {
    this.service.getProduct(companyId, productId).subscribe({
      next: (product: IProduct) => this.displayProduct(product),
      error: err => this.errorMessage = err
    });
  }

  displayProduct(product: IProduct): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if (this.product.productId === 0){
      this.pageTitle = 'Add product';
    } else {
      this.pageTitle = `Edit product: ${this.product.name}`;
    }

    this.productForm.patchValue({
      name: this.product.name,
      barcode: this.product.barcode,
      description: this.product.description,
      companyID: this.companyID
    });
  }

  save(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const p = {...this.product, ...this.productForm.value};

        if (p.productId == 0) {
          this.service.createProduct(this.companyID, p).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        } else {
          this.service.updateProduct(this.companyID, p.productId, p).subscribe({
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
    this.productForm.reset();
    this.router.navigate(['/companies', this.companyID, 'products']);
  }

}
