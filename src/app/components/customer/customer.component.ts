import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer, Notification } from 'src/app/models/customer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  id: number = 0;
  customer: Customer;
  frm: FormGroup;
  vm: any = {
    required: "This field is required",
    minLength: "At least 3 character is required",
    mobile: "Mobile is invalid",
    email: "Email is invalid"
  };
  minDate: Date = new Date(1950, 0, 1);
  maxDate: Date = new Date();
  notificationList: Notification[] = [];
  countries: string[] = [];

  @ViewChild("frmElement", { static: true }) frmElement: any;

  constructor(
    private builder: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = +this.route.snapshot.params["id"];
    this.notificationList = [
      { name: 'SMS', checked: false },
      { name: 'Email', checked: false },
      { name: 'Call', checked: false },
    ];
    this.countries = ['India', 'USA', 'Canada', 'UK', 'France'];
    this.customer = new Customer();
    this.initForm();
  }

  get f() {
    return this.frm.controls;
  }

  ngOnInit() {
    if (this.id) {
      this.customerService.get(this.id).subscribe(customer => {
        this.customer = customer;
        this.initForm();
      });
    }
  }

  onSubmit() {
    if (this.frm.valid) {
      let customer = new Customer();
      let value = this.frm.value;
      let dto = <Customer>{ ...customer, ...value };

      if (!this.id) {
        this.customerService.post(dto).subscribe(response => {
          this.openSnackBar("Record submitted successfully", "Cool");
          this.frmElement.resetForm();
          this.frm.reset();
          setTimeout(() => {
            this.router.navigate(['/customer/list']);
          }, 2000);
        });
      } else {
        dto.id = this.id;
        this.customerService.put(this.id, dto).subscribe(response => {
          this.openSnackBar("Record updated successfully", "Cool");
          setTimeout(() => {
            this.router.navigate(['/customer/list']);
          }, 2000);
        });
      }
    } else {
      this.openSnackBar("Please complete the form", "Yeah");
    }
  }

  onReset($event: any) {
    this.notificationList.forEach((item, index) => {
      this.notificationList[index].checked = false;
    })
  }

  onNotificationChange($event: any) {
    let index = this.notificationList.findIndex(i => i.name === $event.source.value);

    if ($event.checked) {
      this.notificationList[index].checked = true;
    } else {
      this.notificationList[index].checked = false;      
    }

    this.f.notification.setValue(this.notificationList.filter(i => i.checked).map(i => i.name).toString());    
  }

  initForm(): void {
    this.frm = this.builder.group({
      name: [this.customer.name, [Validators.required, Validators.minLength(3)]],
      city: [this.customer.city, [Validators.required]],
      state: [this.customer.state, [Validators.required]],
      country: [this.customer.country, [Validators.required]],
      pinCode: [this.customer.pinCode, [Validators.required]],
      mobile: [this.customer.mobile, [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
      email: [this.customer.email, [Validators.required, Validators.email]],
      gender: [this.customer.gender || "Male"],
      dateOfBirth: [this.customer.dateOfBirth, [Validators.required]],
      notification: [this.customer.notification],
      workLocationDistance: [this.customer.workLocationDistance],
      isPrivate: [this.customer.isPrivate]
    });

    if (this.customer.notification.length) {
      let notifications = this.customer.notification.split(',');
      this.notificationList.forEach((item, index) => {
        let found = notifications.find(i => i === item.name);
        if(found) {
          this.notificationList[index].checked = true;
        }
      });      
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  formatLabel(value: number) {
    return value + 'k';
  }

}
