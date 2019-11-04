import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor(private cs: CustomerService) { }

  ngOnInit() {
    let customers: any = [
      {
        "id": 1,
        "name": "John Marshal",
        "city": "Mumbai",
        "state": "Maharashtra",
        "country": "India",
        "pinCode": 400011,
        "mobile": "7788559988",
        "email": "john@gmail.com",
        "gender": "Male",
        "dateOfBirth": "1973-12-31T18:30:00Z",
        "notification": "Email",
        "workLocationDistance": 42,
        "isPrivate": true
      },
      {
        "id": 2,
        "name": "Jessica Jones",
        "city": "Mumbai",
        "state": "Maharashtra",
        "country": "India",
        "pinCode": 400008,
        "mobile": "7788559988",
        "email": "jessica@gmail.com",
        "gender": "Female",
        "dateOfBirth": "1996-06-11T18:30:00Z",
        "notification": "SMS,Email",
        "workLocationDistance": 34,
        "isPrivate": true
      },
      {
        "id": 3,
        "name": "Allen Green",
        "city": "Mumbai",
        "state": "Maharashtra",
        "country": "India",
        "pinCode": 400007,
        "mobile": "8877665554",
        "email": "allen@gmail.com",
        "gender": "Male",
        "dateOfBirth": "1970-10-28T18:30:00Z",
        "notification": "SMS,Email,Call",
        "workLocationDistance": 10,
        "isPrivate": true
      },
      {
        "id": 4,
        "name": "William Turner",
        "city": "Delhi",
        "state": "Delhi",
        "country": "India",
        "pinCode": 400007,
        "mobile": "7575743868",
        "email": "william@gmail.com",
        "gender": "Male",
        "dateOfBirth": "2000-10-25T18:30:00Z",
        "notification": "SMS",
        "workLocationDistance": 4,
        "isPrivate": true
      },
      {
        "id": 5,
        "name": "Polo Marco",
        "city": "Delhi",
        "state": "Delhi",
        "country": "India",
        "pinCode": 400045,
        "mobile": "3454534534",
        "email": "polo@gmail.com",
        "gender": "Male",
        "dateOfBirth": "1998-10-28T18:30:00Z",
        "notification": "SMS",
        "workLocationDistance": 24,
        "isPrivate": true
      },
      {
        "id": 6,
        "name": "Martin Luther",
        "city": "Pune",
        "state": "Maharashtra",
        "country": "India",
        "pinCode": 400021,
        "mobile": "9432579749",
        "email": "martin@gmail.com",
        "gender": "Male",
        "dateOfBirth": "1996-10-28T18:30:00Z",
        "notification": "SMS",
        "workLocationDistance": 33,
        "isPrivate": true
      },
      {
        "id": 7,
        "name": "Harry Potter",
        "city": "Pune",
        "state": "Maharashtra",
        "country": "India",
        "pinCode": 400008,
        "mobile": "8473658763",
        "email": "harry@gmail.com",
        "gender": "Male",
        "dateOfBirth": "1998-10-28T18:30:00Z",
        "notification": "SMS",
        "workLocationDistance": 21,
        "isPrivate": true
      },
      {
        "id": 8,
        "name": "Lilly Rose",
        "city": "Delhi",
        "state": "Delhi",
        "country": "India",
        "pinCode": 400058,
        "mobile": "8943879875",
        "email": "lilly@gmail.com",
        "gender": "Female",
        "dateOfBirth": "2005-10-28T18:30:00Z",
        "notification": "SMS",
        "workLocationDistance": 12,
        "isPrivate": true
      },
      {
        "id": 9,
        "name": "Tony Stark",
        "city": "Latur",
        "state": "Maharashtra",
        "country": "India",
        "pinCode": 400085,
        "mobile": "8783683683",
        "email": "tony@gmail.com",
        "gender": "Male",
        "dateOfBirth": "1995-10-28T18:30:00Z",
        "notification": "SMS",
        "workLocationDistance": 6,
        "isPrivate": true
      },
      {
        "id": 10,
        "name": "Steve Roger",
        "city": "Nasik",
        "state": "Maharashtra",
        "country": "India",
        "pinCode": 400026,
        "mobile": "8346583465",
        "email": "steve@gmail.com",
        "gender": "Male",
        "dateOfBirth": "2003-10-28T18:30:00Z",
        "notification": "SMS",
        "workLocationDistance": 6,
        "isPrivate": true
      }
    ];
    customers.forEach(customer => {
      customer.id = 0;
      this.cs.post(customer).subscribe();
    })
  }

}
