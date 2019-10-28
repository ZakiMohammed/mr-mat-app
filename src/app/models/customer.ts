export class Customer {
    id: number;
    name: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
    mobile: string;
    email: string;
    gender: string;
    dateOfBirth: Date;
    notification: string;
    workLocationDistance: number;
    isPrivate: boolean;

    constructor() {
        this.id = 0;
        this.name = "";
        this.city = "";
        this.state = "";
        this.country = "";
        this.pinCode = 0;
        this.mobile = "";
        this.email = "";
        this.gender = "";
        this.dateOfBirth = new Date();
        this.notification = "";
        this.workLocationDistance = 0;
        this.isPrivate = false;
    }
    
    public get fullAddress() : string {
        return `${this.city}, ${this.state}, ${this.country}, ${this.pinCode}`;
    }
    
}
