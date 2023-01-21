import {FileHandle} from "./file-handle";

export class Dog {
  id: string
  name: string
  dogsBirth: Date
  breed: string
  ownerName?: string
  ownerSurname?: string
  ownerEmail?: string
  images: FileHandle[]

  constructor(id: string, name: string, dogsBirth: Date, breed: string, images: FileHandle[],
              ownerName?:string, ownerSurname?: string, ownerEmail?: string
  ) {
    this.id = id
    this.name = name
    this.dogsBirth = dogsBirth
    this.breed = breed
    this.ownerName = ownerName
    this.ownerSurname = ownerSurname
    this.ownerEmail = ownerEmail
    this.images = images
  }

  static fromHttp(dog : Dog) : Dog {
      return new Dog(dog.id, dog.name, dog.dogsBirth, dog.breed, dog.images,
        dog.ownerName, dog.ownerSurname, dog.ownerEmail)
  }
}
