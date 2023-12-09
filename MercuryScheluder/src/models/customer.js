export default class Customer {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
    }

    get FirstName() { return this.firstName; }
    get LastName() { return this.lastName; }
    get Phone() { return this.phone; }
    get Email() { return this.email; }

    set FirstName(firstName) { this.firstName = firstName; }
    set LastName(lastName) { this.lastName = lastName; }
    set Phone(phone) { this.phone = phone; }
    set Email(email) { this.email = email; }
}