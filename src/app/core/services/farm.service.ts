import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { IFarm } from 'src/app/shared/interfaces/farm';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class FarmService extends BaseApiService {

  constructor(override readonly http:HttpClient) {
    super(http);
   }

  getFarms(companyID: number):Observable<IFarm[]> {
    return this.get<IFarm[]>(this.url +`/companies/${companyID}/farms`).pipe(tap(data => console.log('All', JSON.stringify(data))),
    catchError(this.handleError));
  }

  getFarm(companyID: number, farmId:number){
    if (farmId === 0) {
      return of(this.initializeFarm(companyID));
    }
    return this.get<IFarm>(this.url + `/companies/${companyID}/farms/${farmId}`);
  }

  createFarm(farm:IFarm){
    return this.post(this.url + `/companies/${farm.companyID}/farms`, farm);
  }

  updateFarm(companyID:number, farmId:number, farm: IFarm){
    return this.put(this.url + `/companies/${companyID}/farms/${farmId}`, farm);
  }

  deleteFarm(companyID:number, farmId:number){
    return this.delete(this.url + `/companies/${companyID}/farms/${farmId}`);
  }


  private handleError(err: HttpErrorResponse): Observable<never> {
    
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


  private initializeFarm(companyId:number): IFarm {
    return {
      farmId: 0,
      name: '',
      description: '',
      capacity: 0,
      companyID: companyId
    };
  }

}


