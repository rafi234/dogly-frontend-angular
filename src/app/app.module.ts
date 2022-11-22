import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { UserComponent } from './admin/user/user.component';
import { DogsComponent } from './admin/user/dogs/dogs.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes } from '@angular/router';
import { AuthRouteGuardService } from './service/auth-route-guard.service';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from './admin/user/edit-user/edit-user.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  // {path: 'admin/user', component: UserComponent, canActivate : [AuthRouteGuardService]},
  {path: 'admin/user', component: UserComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '404'}
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
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
