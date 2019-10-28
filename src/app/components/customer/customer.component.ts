import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
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
  notification: string[] = [];

  @ViewChild("frmElement", { static: true }) frmElement: any;

  constructor(
    private builder: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = +this.route.snapshot.params["id"];
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

  onNotificationChange($event: any) {
    let value = $event.source.value;
    let checked = $event.checked;

    if (checked) {
      this.notification.push(value);
    } else {
      let index = this.notification.findIndex(i => i === value);
      this.notification.splice(index);
    }

    this.f.notification.setValue(this.notification.toString());
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
      notification: ['']
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
