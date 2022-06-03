import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WarehouseService } from 'src/app/core/services/warehouse.service';
import { IWarehouse } from 'src/app/shared/interfaces/warehouse';

@Component({
  selector: 'app-warehouse-inventory',
  templateUrl: './warehouse-inventory.component.html',
  styleUrls: ['./warehouse-inventory.component.css']
})
export class WarehouseInventoryComponent implements OnInit {
  pageTitle = 'Warehouse Inventory';
  buttonText = 'Add Product'
  warehouse: IWarehouse;
  companyID: number;
  warehouseId: number;
  errorMessage: string = '';
  sub!: Subscription;
  displayedColumns: string[] = [ 'productionDate', 'expirationDate', 'amount', 'Buttons'];
  constructor(private service: WarehouseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.companyID = this.route.snapshot.params['companyID'];
    this.warehouseId = this.route.snapshot.params['warehouseId'];
    this.sub = this.service.getWarehouse(this.companyID, this.warehouseId).subscribe({
      next: warehouse => this.warehouse = warehouse,
      error: err => this.errorMessage = err
    });
  }

  
  openForm(productVariationId: number) {
    //todo
  }

  deleteVariation(id: number): void {
    //todo
  }

}
