import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialog/delete/delete.component';
import { DialogData } from 'src/app/models/dialog-data';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  dataSource: Customer[] = [];
  displayedColumns: string[] = ['id', 'name', 'address', 'mobile', 'email', 'action'];

  @ViewChild('matTableCustomer', { static: true }) matTableCustomer: MatTable<Customer>;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog) { 
      // this.displayedColumns = Object.keys(new Customer());
      // this.displayedColumns.push('action');
    }

  ngOnInit() {
    this.customerService.getAll().subscribe(customers => {
      this.dataSource = customers;
    });
  }

  onDeleteClick($event: any, customer: Customer) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: <DialogData>{ title: 'customer ' + customer.name, data: customer, response: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.delete(customer.id).subscribe(response => {
          let index = this.dataSource.findIndex(i => i.id === customer.id);
          this.dataSource.splice(index, 1);
          this.matTableCustomer.renderRows();
        }); 
      }
    });
  }

}
