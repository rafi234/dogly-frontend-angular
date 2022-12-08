
export class DogPark {
  id: string
  url: string
  type: string
  city: string
  location: string
  voivodeship: string
  imgUrl: string

  constructor(id: string, url: string, type: string, city: string, location: string, voivodeship: string, imgUrl: string) {
    this.id = id
    this.url = url
    this.type = type
    this.city = city
    this.location = location
    this.voivodeship = voivodeship
    this.imgUrl = imgUrl

  }

  toString(): string {
    return `${this.city}, ${this.location}`
  }

  static fromHttp(dogPark: DogPark) {
    return new DogPark(
      dogPark.id,
      dogPark.url,
      dogPark.type,
      dogPark.city,
      dogPark.location,
      dogPark.voivodeship,
      dogPark.imgUrl
    )
  }
}
