import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialog/delete/delete.component';
import { DialogData } from 'src/app/models/dialog-data';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-customer-paging',
  templateUrl: './customer-paging.component.html',
  styleUrls: ['./customer-paging.component.css']
})
export class CustomerPagingComponent implements OnInit {

  dataSource = new MatTableDataSource<Customer>();
  displayedColumns: string[] = ['id', 'name', 'mobile', 'email', 'action'];

  totalCount = 0;
  pageSize = 5;
  loading = true;

  @ViewChild('matTableCustomer', { static: true }) matTableCustomer: MatTable<Customer>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.loading = true;
        return this.customerService.getPagination(this.paginator.pageIndex + 1, this.pageSize, this.sort.active, this.sort.direction);
      }),
      map((data: any) => {        
        this.loading = false;
        this.totalCount = data.totalCount;

        return data.items;
      })
    ).subscribe(data => this.dataSource = data);
  }

  onDeleteClick($event: any, customer: Customer) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: <DialogData>{ title: 'customer ' + customer.name, data: customer, response: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.delete(customer.id).subscribe(response => {
          let index = this.dataSource.data.findIndex(i => i.id === customer.id);
          this.dataSource.data.splice(index, 1);
          this.matTableCustomer.renderRows();
        });
      }
    });
  }

}
