import {Dog} from "./Dog";

export class User {
  id: string
  name: string
  surname: string
  email: string
  address: Address
  dogs: Dog[]
  roles: Role[]
  active: boolean

  constructor(id: string, name: string, surname: string, email: string,
              address: Address, dogs: Dog[], roles: Role[], active: boolean) {
    this.id = id
    this.name = name
    this.surname = surname
    this.email = email
    this.address = address
    this.dogs = dogs
    this.roles = roles
    this.active = active
  }

  static fromHttp(data: User): User {
    const newAddress = Address.fromHttp(data.address)
    const dogs = data.dogs.map(dog => Dog.fromHttp(dog))
    const roles = new Array<Role>()
    for (const role of data.roles) {
      roles.push(role)
    }
    return new User(
      data.id, data.name, data.surname,
      data.email, newAddress, dogs,
      roles, data.active
    )
  }
}

export class Address {
  id: string
  country: string
  voivodeship: string
  city: string
  street: string
  postalCode: string

  constructor(id: string, country: string, voivodeship: string, city: string, street: string, postalCode: string) {
    this.id = id
    this.country = country
    this.voivodeship = voivodeship
    this.city = city
    this.street = street
    this.postalCode = postalCode
  }

  static fromHttp(address: Address): Address {
    return new Address(
      address.id, address.country, address.voivodeship,
      address.city, address.street, address.postalCode
    )
  }

  toString(): string {
    return `Country: ${this.country}\nCity: ${this.city}\nVoivodeship: ${this.voivodeship}\nStreet: ${this.street}, ${this.postalCode}`
  }

}

export enum Role {
  ROLE_USER = 'User',
  ROLE_ADMIN = 'Admin'
}



