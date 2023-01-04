import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UserComponent} from './admin/user/user.component';
import {DogsComponent} from './admin/user/dogs/dogs.component';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from './navigation/navigation.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EditUserComponent} from './admin/user/edit-user/edit-user.component';
import {RegistrationComponent} from './registration/registration.component';
import {MeetingsComponent} from './meetings/meetings.component';
import {AddMeetingComponent} from './meetings/add-meeting/add-meeting.component';
import {WalksComponent} from './walks/walks.component';
import {WalksAddComponent} from './walks/walks-add/walks-add.component';
import {AuthRouteGuardService} from "./service/auth-route-guard.service";
import {AuthInterceptor} from "./service/auth.interceptor";
import {UserService} from "./service/user.service";
import {UserDogsComponent} from "./user/dogs/user-dogs.component";
import {EmptyComponent} from './empty/empty.component';
import {AddDogComponent} from './user/dogs/add-dog/add-dog.component';
import {EditDogComponent} from './user/dogs/edit-dog/edit-dog.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {TimeSincePipe} from "./pipe/TimeSincePipe";
import {PhoneNumberPipe} from "./pipe/PhoneNumberPipe";
import { ModalThanksComponent } from './modal-thanks/modal-thanks.component';
import { ForbiddenSideComponent } from './forbidden-side/forbidden-side.component';

const routes: Routes = [
  { path: 'admin/user', component: UserComponent, canActivate : [AuthRouteGuardService], data:{ roles: ['ROLE_ADMIN']}},
  { path: 'admin/dogs', component: UserDogsComponent, canActivate : [AuthRouteGuardService], data: { roles: ['ROLE_ADMIN']}},
  { path: 'user/dogs', component: UserDogsComponent, canActivate : [AuthRouteGuardService], data: { roles: ['ROLE_USER']}},
  { path: 'user/edit', component: EmptyComponent, canActivate : [AuthRouteGuardService], data: { roles: ['ROLE_USER']}},
  { path: 'user/walks', component: WalksComponent, canActivate : [AuthRouteGuardService], data: { roles: ['ROLE_USER']}},
  { path: 'walks', component: WalksComponent},
  { path: 'meetings', component: MeetingsComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'login', component: LoginComponent},
  { path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '404'}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    DogsComponent,
    LoginComponent,
    NavigationComponent,
    PageNotFoundComponent,
    EditUserComponent,
    RegistrationComponent,
    MeetingsComponent,
    AddMeetingComponent,
    WalksComponent,
    WalksAddComponent,
    UserDogsComponent,
    EmptyComponent,
    AddDogComponent,
    EditDogComponent,
    TimeSincePipe,
    PhoneNumberPipe,
    ModalThanksComponent,
    ForbiddenSideComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    AuthRouteGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
