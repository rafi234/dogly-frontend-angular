import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../model/User";
import {environment} from "../../environments/environment";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {ImageUtil} from "../utils/ImageUtil";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  )

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService) {
  }

  login(loginData: NgForm): Observable<any> {
    return this.httpClient.post(environment.restUrl + '/api/authenticate', loginData.value, {headers: this.requestHeader})
  }

  roleMatch(allowedRoles: string[]) : boolean {
    const userRoles: any = this.authService.getRoles()
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; ++i) {
        for (let j = 0; j < allowedRoles.length; ++j) {
          if (userRoles[i] === allowedRoles[j]) {
            return true
          }
        }
      }
    }
    return false
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

  updateUser(user: User): Observable<User> {
    const formDataUser = this.getPreparedUser(user)
    return this.httpClient.put<User>(environment.restUrl + '/api/user/update', formDataUser, { withCredentials: false })
  }

  deleteUser(user: User): Observable<any> {
    return this.httpClient.delete(environment.restUrl + '/api/user/' + user.email)
  }

  addUser(user: User, password: string): Observable<User> {
    const formDataUser = this.getPreparedUser(user, password)
    return this.httpClient.post<User>(environment.restUrl + "/api/auth/signup", formDataUser)
  }

  logout() : Observable<any> {
    return this.httpClient.put(environment.restUrl + '/api/logout', null);
  }

  getLoggedUser(email: string): Observable<User> {
    return this.httpClient.get<User>(environment.restUrl + '/api/user/' + email).pipe(
        map(
          data => {
           return  User.fromHttp(data)
          }
        )
    )
  }

  manageRoles(id: string, action: string, role: string) {
    return this.httpClient.put(`${environment.restUrl}/api/grant/user/${id}?action=${action}&role=${role}`,  null)
  }

  changePassword(password: string, id: string) {
    const newPassword = {
      'new_password': password,
      'id': id
    }
    return this.httpClient.put(environment.restUrl + '/api/user/update/password', newPassword);
  }

  private getPreparedUser(user: User, password?: string): FormData {
    const newUser = {
      'id': user.id,
      'name': user.name,
      'surname': user.surname,
      'email': user.email,
      'street': user.address.street,
      'city': user.address.city,
      'country': user.address.country,
      'postal_code': user.address.postalCode,
      'voivodeship': user.address.voivodeship,
      'phoneNumber': user.phoneNumber,
      'images': user.images,
      'password': password
    }
    return  ImageUtil.prepareFormData(newUser, 'user', 'imageFiles')
  }
}

