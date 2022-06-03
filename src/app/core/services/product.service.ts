import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseApiService {

  constructor(override readonly http: HttpClient) {
    super(http);
  }

  getProducts(companyID: number):Observable<IProduct[]> {
    return this.get<IProduct[]>(this.url + `/companies/${companyID}/products`);
  }

  getProduct(companyID: number, productId:number){
    if (productId === 0) {
      return of(this.initializeProduct(companyID));
    }
    return this.get<IProduct>(this.url + `/companies/${companyID}/products/${productId}`);
  }

  createProduct(companyID:number, product: IProduct){
    return this.post(this.url + `/companies/${companyID}/products`, product);
  }

  updateProduct(companyID: number, productId:number, product: IProduct){
    return this.put(this.url + `/companies/${companyID}/products/${productId}`, product);
  }

  deleteProduct(companyID:number, productId:number){
    return this.delete(this.url + `/companies/${companyID}/products/${productId}`);
  }

  initializeProduct(companyId: number) : IProduct{
    return {
      productId: 0,
      name: '',
      barcode: '',
      isFood: false,
      description: '',
      companyID: companyId
    };
  }
}
