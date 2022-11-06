import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';   // use this
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { WavesModule, TableModule, IconsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { UsersComponent } from './users/users.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CarouselModule} from "ngx-bootstrap/carousel";
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import {initializeKeycloak} from "./init/keycloak-init.factory";
// @ts-ignore

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CampaignsComponent,
    HomeComponent,
    LoginComponent,
    CreateCampaignComponent,
    UsersComponent,
    ProgressbarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    WavesModule,
    TableModule,
    IconsModule,
    MDBBootstrapModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
