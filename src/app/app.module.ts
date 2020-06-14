import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { JWTInterceptor } from '../helpers/jwt.interceptor';
import { ErrorInterceptor } from '../helpers/error.interceptor';
import { fakeBackendProvider } from '../helpers/fake_backend.interceptor';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule ],
  declarations: [ AppComponent, HomeComponent, LoginComponent ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi:true},
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},
  fakeBackendProvider],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
  