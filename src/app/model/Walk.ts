import {Dog} from "./Dog";
import {User} from "./User";

export interface Walk {
  id: string
  description: string
  price: number
  dogs: Dog[]
  date: Date
  addedAt: Date
  adState: AdState
  confirmedAt: Date
  confirmedUser?: User
  user?: User
}

export class WalkUtil {

  static fromHttp(walk: Walk): Walk {
      return {
        id: walk.id,
        description: walk.description,
        price: walk.price,
        dogs: this.dogArrayFromHttp(walk.dogs),
        date: walk.date,
        addedAt: walk.addedAt,
        adState: walk.adState,
        confirmedAt: walk.confirmedAt,
        confirmedUser: walk.confirmedUser,
        user: walk.user
      }
  }

  private static dogArrayFromHttp(dogs: Dog[]): Dog[] {
    return dogs.map(dog => Dog.fromHttp(dog))
  }
}

export enum AdState {
  WAITING_FOR_USER = "WAITING_FOR_USER",
  WAITING_FOR_CONFIRMATION = "WAITING_FOR_CONFIRMATION",
  DENIED = "DENIED",
  ALLOWED = "ALLOWED"
}

