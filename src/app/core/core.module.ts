import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CompanyService } from './services/company.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FarmService } from './services/farm.service';
import { ProductService } from './services/product.service';
import { PartnerService } from './services/partner.service';
import { ReportService } from './services/report.service';
import { InvoiceService } from './services/invoice.service';
import { WarehouseService } from './services/warehouse.service';
import { ProductVariationService } from './services/product-variation.service';
import { RecipeService } from './services/recipe.service';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    CompanyService, 
    FarmService, 
    ProductService,
    PartnerService, 
    ReportService,
    InvoiceService,
    WarehouseService,
    ProductVariationService,
    RecipeService
  ]
})
export class CoreModule { }
