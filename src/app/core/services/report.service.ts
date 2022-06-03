import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IReport } from 'src/app/shared/interfaces/report';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseApiService {
  
  constructor(override readonly http: HttpClient) {
    super(http);
  }

  getReports(companyID:number, farmId:number):Observable<IReport[]> {
    return this.get<IReport[]>(this.url + `/companies/${companyID}/farms/${farmId}/reports`);
  }

  getReport(companyID:number, farmId:number, reportId:number){
    if (reportId === 0) {
      return of(this.initializeReport(farmId));
    }
    return this.get<IReport>(this.url + `/companies/${companyID}/farms/${farmId}/reports/${reportId}`);
  }

  createReport(companyID:number, report: IReport){
    return this.post(this.url + `/companies/${companyID}/farms/${report.farmId}/reports`, report);
  }

  updateReport(companyID:number, farmId:number, reportId:number, report: IReport){
    return this.put(this.url + `/companies/${companyID}/farms/${farmId}/reports/${reportId}`, report);
  }

  deleteReport(companyID:number, farmId:number, reportId:number){
    return this.delete(this.url + `/companies/${companyID}/farms/${farmId}/reports/${reportId}`);
  }

  private initializeReport(farmId:number): IReport {
    return {
      reportId: 0,
      name: '',
      madeOn: new Date,
      eggProduction: 0,
      deaths: 0,
      vitamins: '',
      foodAmount: 0,
      coefficient: 0,
      farmId: farmId
    };
  }
}
