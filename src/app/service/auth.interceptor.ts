import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorMessageComponent} from "../error-message/error-message.component";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
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
            this.openModalWithErrorMessage(err)
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

  private openModalWithErrorMessage(err: HttpErrorResponse) {
    const refModal = this.modalService.open(ErrorMessageComponent, {centered: true, animation: true, size: "lg"})
    refModal.componentInstance.err = err
    console.log(err)
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
