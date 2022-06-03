import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductVariationService } from '../core/services/product-variation.service';
import { IProductVariation } from '../shared/interfaces/productVariation';

@Component({
  selector: 'app-product-variation',
  templateUrl: './product-variation.component.html',
  styleUrls: ['./product-variation.component.css']
})
export class ProductVariationComponent implements OnInit {

  pageTitle = 'Product Variations';
  buttonText = 'Add Product Variation'
  variations: IProductVariation[] = [];
  companyID: number;
  productId: number;
  errorMessage: string = '';
  sub!: Subscription;
  displayedColumns: string[] = ['productVariationId', 'productionDate', 'expirationDate', 'amount', 'Buttons'];


  constructor(private service: ProductVariationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.companyID = this.route.snapshot.params['companyID'];
    this.productId = this.route.snapshot.params['productId'];
    this.sub = this.service.getVariations(this.companyID, this.productId).subscribe({
      next: variations => this.variations = variations,
      error: err => this.errorMessage = err
    });
  }

  openForm(productVariationId: number) {
    if(productVariationId == 0){
      this.router.navigate(['/companies', this.companyID, 'products', this.productId, 'variations', 0, 'edit']);
    } else {
      this.router.navigate(['/companies', this.companyID, 'products', this.productId, 'variations', productVariationId, 'edit']);
    }
  }

  deleteVariation(id: number): void {
    if (id === 0) {
      // Don't delete, it was never saved.
      this.router.navigate(['**']);
    } else if (id) {
      if (confirm(`Really delete the product`)) {
        this.service.deleteVariation(this.companyID, this.productId, id)
          .subscribe({
            next: () => this.router.navigate(['companies', this.companyID, 'products', this.productId, 'variations']),
            error: err => this.errorMessage = err
          });
      }
    }
  }

}
