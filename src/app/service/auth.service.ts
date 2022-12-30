import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setRoles(roles:[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  getRoles() : [] {
    const roles = localStorage.getItem('roles')
    if (roles)
      return JSON.parse(roles);
    return []
  }

  setEmail(email: string) {
    localStorage.setItem('email', email)
  }

  getEmail(): string | null{
    return localStorage.getItem('email')
  }

  setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken')

  }

  clear() {
    localStorage.clear()
  }

  isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
