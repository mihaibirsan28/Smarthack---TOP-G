import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CampaignService} from "../services/CampaignService";
import {Campaign} from "../model/campaign";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  campaigns!: Campaign[];
  selected:any;
  dataValue:any;
  selectedCampaign!:Campaign;
  headElements = ['Id', 'Name', 'Date', 'Social Media Platforms', 'Action'];
  constructor(private campaignService:CampaignService, private modalService:NgbModal) {
  }


  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.campaignService.getAllCampaigns().subscribe(data=>{
      this.campaigns=data;
      console.log(data);
    })
  }

  getAds(){
    this.campaignService.getAdsByName("fashion").subscribe(data=>{
      this.dataValue=data;
    })
  }

}
