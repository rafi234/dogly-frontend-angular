import {Dog} from "./Dog";
import {User} from "./User";

export interface Walk {
  walkId: string,
  description: string,
  price: number,
  dogs: Dog[],
  date: Date,
  user?: User
}

export class WalkUtil {

  static fromHttp(walk: Walk): Walk {
      return {
        walkId: walk.walkId,
        description: walk.description,
        price: walk.price,
        dogs: this.dogArrayFromHttp(walk.dogs),
        date: walk.date,
        user: walk.user
      }
  }

  private static dogArrayFromHttp(dogs: Dog[]): Dog[] {
    return dogs.map(dog => Dog.fromHttp(dog))
  }
}

