
export class Dog {
  id: string
  name: string
  dogsBirth: string
  breed: string
  isActive: boolean

  constructor(id: string, name: string, dogsBirth: string, breed: string, isActive: boolean) {
    this.id = id
    this.name = name
    this.dogsBirth = dogsBirth
    this.breed = breed
    this.isActive = isActive
  }

  static fromHttp(dog : Dog) : Dog {
    return new Dog(dog.id, dog.name, dog.dogsBirth, dog.breed, dog.isActive)
  }
}
