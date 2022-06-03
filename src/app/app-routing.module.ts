import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { PageNotFoundComponent } from './page-not-found.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
    {path: 'home', component: CompanyComponent },
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: '**', component: PageNotFoundComponent }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
