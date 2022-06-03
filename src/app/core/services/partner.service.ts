import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPartner } from 'src/app/shared/interfaces/partner';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerService extends BaseApiService {

  constructor(override readonly http:HttpClient) { 
    super(http);
  }

  getPartners(companyID: number):Observable<IPartner[]> {
    return this.get<IPartner[]>(this.url + `/companies/${companyID}/partners`);
  }

  getPartner(companyID: number, partnerId:number){
    if (partnerId === 0) {
      return of(this.initializePartner(companyID));
    }
    return this.get<IPartner>(this.url + `/companies/${companyID}/partners/${partnerId}`);
  }

  createPartner(partner: IPartner){
    return this.post(this.url + `/companies/${partner.companyID}/partners`, partner);
  }

  updatePartner(companyID:number, partnerId:number, partner: IPartner){
    return this.put(this.url + `/companies/${companyID}/partners/${partnerId}`, partner);
  }

  deletePartner(companyID:number, partnerId:number){
    return this.delete(this.url + `/companies/${companyID}/partners/${partnerId}`);
  }

  private initializePartner(companyId:number): IPartner {
    return {
      partnerId: 0,
      name: '',
      address: '',
      idNumber: 0,
      pdvNumber: 0,
      description: '',
      companyID: companyId
    };
  }
}
