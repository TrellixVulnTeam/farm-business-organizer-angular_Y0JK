import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProductVariation } from 'src/app/shared/interfaces/productVariation';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductVariationService extends BaseApiService {

  constructor(override readonly http: HttpClient) {
    super(http);
  }

  getVariations(companyID: number, productId:number):Observable<IProductVariation[]> {
    return this.get<IProductVariation[]>(this.url + `/companies/${companyID}/products/${productId}/productVariations`);
  }

  getVariation(companyID: number, productId:number, productVariationId:number){
    if (productVariationId === 0) {
      return of(this.initializeVariation(productId));
    }
    return this.get<IProductVariation>(this.url + `/companies/${companyID}/products/${productId}/productVariations/${productVariationId}`);
  }

  createVariation(companyID: number, variation: IProductVariation){
    return this.post(this.url + `/companies/${companyID}/products/${variation.productId}/productVariations`, variation);
  }

  updateVariation(companyID: number, productId:number, productVariationId:number, variation: IProductVariation){
    return this.put(this.url + `/companies/${companyID}/products/${productId}/productVariations/${productVariationId}`, variation);
  }

  deleteVariation(companyID: number, productId:number, productVariationId:number){
    return this.delete(this.url + `/companies/${companyID}/products/${productId}/productVariations/${productVariationId}`);
  }

  private initializeVariation(productId:number): IProductVariation {
    return {
      productVariationId: 0,
      productionDate: new Date,
      expirationDate: new Date,
      amount: 0,
      companyId: 0,
      productId: productId
    };
  }
}
