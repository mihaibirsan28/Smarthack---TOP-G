import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {CampaignService} from "../services/CampaignService";
import {User} from "../model/users";
import {Campaign} from "../model/campaign";
import {Router} from "@angular/router"


@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {
  dummyRequester = new User('', 'email@email.com', 'Dummy', new Date());
  dummyCampaign: Campaign = new Campaign();

  form = new FormGroup({
    'description': new FormControl(),
    'goal': new FormControl()
  })
  constructor(private campaignService: CampaignService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.dummyCampaign.descritpion = this.form.value.description;
    this.dummyCampaign.campaignGoal = this.form.value.goal;
    console.log(this.campaignService.createCampaign(this.dummyCampaign).subscribe(data => {
      console.log(data);
      this.dummyCampaign = data;
    }))
    console.log(this.dummyCampaign);
    this.router.navigate(['campaigns'])

  }
}
