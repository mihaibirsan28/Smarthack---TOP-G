import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, NgForm} from "@angular/forms";
import {CampaignService} from "../services/CampaignService";
import {User} from "../model/users";
import {Campaign, PostSocial} from "../model/campaign";
import {Router} from "@angular/router"
import {ActivatedRoute} from "@angular/router";



@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {

  campaign!:Campaign;
  auxiliarPostSocial!:PostSocial[];


  constructor(private campaignService: CampaignService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params?.['id']!=null){
        this.campaignService.getCampaignById(params?.['id']).subscribe(value => {
          this.campaign=value;
        });
      }
      else{
        this.campaign=new Campaign();
        this.auxiliarPostSocial=[];
      }
    })

  }

  addSocialPost(){
    this.auxiliarPostSocial.push(new PostSocial());
  }

}
