import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../core/services/product.service';
import { IProduct } from '../shared/interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  pageTitle = 'Products';
  buttonText = 'Add Product'
  products: IProduct[] = [];
  companyID: number;
  errorMessage: string = '';
  sub!: Subscription;
  displayedColumns: string[] = ['productId', 'name', 'barcode', 'description', 'Buttons'];

  constructor(private service: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.companyID = this.route.snapshot.params['companyID'];
    this.sub = this.service.getProducts(this.companyID).subscribe({
      next: products => this.products = products,
      error: err => this.errorMessage = err
    });
  }

  //TODO
  openVariations(productId:number) {
    this.router.navigate(['/companies', this.companyID, 'products', productId, 'variations']);
}

openForm(productId: number) {
  if(productId == 0){
    this.router.navigate(['/companies', this.companyID, 'products', 0, 'edit']);
  } else {
    this.router.navigate(['/companies', this.companyID, 'products', productId, 'edit']);
  }
}

deleteProduct(id: number): void {
  if (id === 0) {
    // Don't delete, it was never saved.
    this.router.navigate(['**']);
  } else if (id) {
    if (confirm(`Really delete the product`)) {
      this.service.deleteProduct(this.companyID, id)
        .subscribe({
          next: () => this.router.navigate(['companies', this.companyID, 'products']),
          error: err => this.errorMessage = err
        });
    }
  }
}

}
