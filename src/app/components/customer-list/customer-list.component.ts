import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialog/delete/delete.component';
import { DialogData } from 'src/app/models/dialog-data';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  dataSource = new MatTableDataSource<Customer>();
  displayedColumns: string[] = ['id', 'name', 'mobile', 'email', 'action'];

  @ViewChild('matTableCustomer', { static: true }) matTableCustomer: MatTable<Customer>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog) {
    // this.displayedColumns = Object.keys(new Customer());
    // this.displayedColumns.push('action');
  }

  ngOnInit() {
    this.sort.active = 'id';
    this.sort.direction = 'desc';

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.customerService.getAll().subscribe(customers => {
      this.dataSource.data = customers;
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
          let dataSource = this.dataSource.data.concat();
          let index = dataSource.findIndex(i => i.id === customer.id);
          dataSource.splice(index, 1);          
          this.dataSource = new MatTableDataSource<Customer>(dataSource);
          this.matTableCustomer.renderRows();
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
