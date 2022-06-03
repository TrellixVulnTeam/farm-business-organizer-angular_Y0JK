import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { ICompany } from 'src/app/shared/interfaces/company';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CompanyService extends BaseApiService {

  constructor(override readonly http:HttpClient) {
    super(http);
   }

  getCompanies():Observable<ICompany[]> {
    return this.get<ICompany[]>(this.url + `/companies`).pipe(tap(data => console.log('All', JSON.stringify(data))),
    catchError(this.handleError));
  }

  getCompany(id:number|string){
    if (id === 0) {
      return of(this.initializeCompany());
    }
    return this.get<ICompany>(this.url + `/companies/${id}`).pipe(tap(data => console.log('getCompany', JSON.stringify(data))),
    catchError(this.handleError));
  }

  createCompany(company: ICompany){
    return this.post(this.url + `/companies`, company);
  }

  updateCompany(company: ICompany){
    return this.put(this.url + `/companies/${company.companyID}`, company);
  }

  deleteCompany(id:number|string){
    return this.delete(this.url + `/companies/${id}`);
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


  private initializeCompany(): ICompany {
    return {
    companyID: 0,
    name: '',
    address: '',
    phone: '',
    email: '',
    idNumber: 0,
    pdvNumber: 0,
    bankNumber: 0
    };
  }

}
