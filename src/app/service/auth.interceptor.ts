import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get("No-Auth") === "True") {
      return next.handle(req.clone())
    }
    const token = this.authService.getToken()
    if (token) {
      req = this.addToken(req, token)

      return next.handle(req).pipe(
        catchError(
          (err: HttpErrorResponse) => {
            console.log(err.status)
            if (err.status === 401) {
              this.router.navigate(['/login'])
            } else if (err.status === 403) {
              this.router.navigate(['forbidden'])
            }
            return throwError("Something is wrong")
          }
        )
      )
    }
    console.error("Token not found!")
    return next.handle(req)
  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
}
