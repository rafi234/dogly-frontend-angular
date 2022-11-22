import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../model/User";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<Array<User>> {
    let users;
    return this.httpClient.get<Array<User>>(environment.restUrl + '/api/user').pipe(
      map(data => {
          users = new Array<User>()
          data.forEach(u => users.push(User.fromHttp(u)))
          return users;
        }
      )
    );
  }

  updateUser(user : User): Observable<User> {
    const updatedUser = {
      'name' : user.name,
      'surname' : user.surname,
      'email' : user.email,
      'street' : user.address.street,
      'city' : user.address.city,
      'country' : user.address.country,
      'postalCode' : user.address.postalCode,
      'voivodeship' :user.address.voivodeship
    }
    return this.httpClient.put<User>(environment.restUrl + '/api/user/update', updatedUser, {withCredentials: false})
  }

  deleteUser(user : User): Observable<any>{
    return this.httpClient.delete(environment.restUrl + '/api/user/' + user.email)
  }

  addUser(user : User): Observable<User>{
    return this.httpClient.post<User>(environment.restUrl + "/api/auth/signup", user)
  }
}

