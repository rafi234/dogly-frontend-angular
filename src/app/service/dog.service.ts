import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Dog} from "../model/Dog";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private httpClient: HttpClient) { }

  getUsersDogs(): Observable<Dog[]> {
    return this.httpClient.get<Dog[]>(environment.restUrl + "/api/dog/user").pipe(
      map(
        data => {
          const dogs = new Array<Dog>()
          data.forEach(dog => dogs.push(Dog.fromHttp(dog)))
          return dogs
        }
      )
    )
  }

  editDog(dog: FormData): Observable<any> {
    return this.httpClient.put(environment.restUrl + '/api/dog', dog)
  }

  addDog(dog: FormData): Observable<any> {
    return this.httpClient.post(environment.restUrl + "/api/dog", dog)
  }

  deleteDog(id: string) {
    return this.httpClient.delete(environment.restUrl + '/api/dog/' + id)
  }
}
