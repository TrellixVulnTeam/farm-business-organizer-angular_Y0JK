import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WarehouseService } from '../core/services/warehouse.service';
import { IWarehouse } from '../shared/interfaces/warehouse';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  pageTitle = 'Warehouses';
  buttonText = 'Add Warehouse'
  warehouses: IWarehouse[] = [];
  companyID: number;
  errorMessage: string = '';
  sub!: Subscription;


  constructor(private service: WarehouseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.companyID = this.route.snapshot.params['companyID'];
    this.sub = this.service.getWarehouses(this.companyID).subscribe({
      next: warehouses => this.warehouses = warehouses,
      error: err => this.errorMessage = err
    });
  }


  openWarehouse(warehouseId:number) {
    this.router.navigate(['/companies', this.companyID, 'warehouses', warehouseId, 'inventory']);
  }

  openForm(companyID: number, warehouseId: number) {
    if(warehouseId == 0){
      this.router.navigate(['/companies', companyID, 'warehouses', 0, 'edit']);
    } else {
      this.router.navigate(['/companies', companyID, 'warehouses', warehouseId, 'edit']);
    }
  }

  deleteWarehouse(id: number): void {
    if (id === 0) {
      // Don't delete, it was never saved.
      this.router.navigate(['**']);
    } else if (id) {
      if (confirm(`Really delete the product`)) {
        this.service.deleteWarehouse(this.companyID, id)
          .subscribe({
            next: () => this.router.navigate(['companies', this.companyID, 'warehouses']),
            error: err => this.errorMessage = err
          });
      }
    }
  }


}
