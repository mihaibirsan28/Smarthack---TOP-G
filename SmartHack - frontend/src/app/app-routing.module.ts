import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {CampaignsComponent} from "./campaigns/campaigns.component";
import {LoginComponent} from "./login/login.component";
import {CreateCampaignComponent} from "./create-campaign/create-campaign.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'campaigns', component: CampaignsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'campaigns/create', component: CreateCampaignComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
