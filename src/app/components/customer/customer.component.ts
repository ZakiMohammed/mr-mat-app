import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  frm: FormGroup;
  vm: any = {
    required: "This field is required",
    minLength: "At least 3 character is required",
  }

  constructor(
    private builder: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) { }

  get f() {
    return this.frm.controls;
  }

  ngOnInit() {
    this.frm = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {    
    if (this.frm.valid) {
      let customer = new Customer();
      let value = this.frm.value;      
      this.customerService.post(<Customer>{...customer, ...value }).subscribe(response => {                
        this.openSnackBar("Record submitted successfully", "Cool");
      })
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
