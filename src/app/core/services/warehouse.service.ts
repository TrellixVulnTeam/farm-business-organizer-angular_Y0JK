import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IWarehouse } from 'src/app/shared/interfaces/warehouse';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService extends BaseApiService {

  constructor(override readonly http: HttpClient) {
    super(http);
  }

  getWarehouses(companyID: number):Observable<IWarehouse[]> {
    return this.get<IWarehouse[]>(this.url + `/companies/${companyID}/warehouses`);
  }

  getWarehouse(companyID: number, warehouseId:number){
    if (warehouseId === 0) {
      return of(this.initializeWarehouse(companyID));
    }
    return this.get<IWarehouse>(this.url + `/companies/${companyID}/warehouses/${warehouseId}`);
  }

  createWarehouse(warehouse: IWarehouse){
    return this.post(this.url + `/companies/${warehouse.companyID}/warehouses`, warehouse);
  }

  updateWarehouse(companyID:number, warehouseId:number, warehouse: IWarehouse){
    return this.put(this.url + `/companies/${companyID}/warehouses/${warehouseId}`, warehouse);
  }

  deleteWarehouse(companyID:number, warehouseId:number){
    return this.delete(this.url + `/companies/${companyID}/warehouses/${warehouseId}`);
  }

  initializeWarehouse(companyID:number): IWarehouse{
    return {
      warehouseId: 0,
      name: '',
      description: '',
      capacity: 0,
      productVariations: [],
      companyID: companyID
    };
  }
}
