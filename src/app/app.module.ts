import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyModule } from './company/company.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ProductModule } from './product/product.module';
import { FarmModule } from './farm/farm.module';
import { AddEditCompanyComponent } from './company/add-edit-company/add-edit-company.component';
import { ReportModule } from './report/report.module';
import { PartnerModule } from './partner/partner.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ProductVariationModule } from './product-variation/product-variation.module';
import { RecipeModule } from './recipe/recipe.module';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    CompanyModule,
    DashboardModule,
    WarehouseModule,
    ProductModule,
    FarmModule,
    ReportModule,
    PartnerModule,
    InvoiceModule,
    ProductVariationModule,
    AppRoutingModule,
    RecipeModule,

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
