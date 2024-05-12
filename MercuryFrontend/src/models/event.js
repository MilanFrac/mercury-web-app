export default class Event {
  constructor(
    firstName,
    lastName,
    address,
    phoneNumber,
    serviceType,
    product,
    realizationDate,
    description
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.serviceType = serviceType;
    this.product = product;
    this.realizationDate = realizationDate;
    this.description = description;
  }
}
