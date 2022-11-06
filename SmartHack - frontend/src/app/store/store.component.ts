import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CampaignService} from "../services/CampaignService";
import {Campaign} from "../model/campaign";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-campaigns',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  campaigns!: Campaign[];
  selectedCampaign!:Campaign;
  headElements = ['Id', 'Description', 'Goal', 'Current amount', 'Action'];
  editForm = new UntypedFormGroup({
    'description': new UntypedFormControl(),
    'goal': new UntypedFormControl()
  })
  donationForm = new UntypedFormGroup({
    'amountToDonate': new UntypedFormControl()
  });
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

  onDelete(campaignId: string) {
    this.campaignService.deleteCampaignById(campaignId).subscribe(data=>{
      console.log(data);
      this.initData();
    }, error => {
      console.log(error);
    });
    console.log(campaignId);
    console.log("clicked");
  }
  openEdit(targetModal: any, campaign:Campaign) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      description: campaign.descritpion,
      goal: campaign.campaignGoal
    });
    this.selectedCampaign = campaign;
  }
  onSubmitEdits() {
    this.selectedCampaign.descritpion=this.editForm.value.description;
    this.selectedCampaign.campaignGoal=this.editForm.value.goal;
    console.log(this.selectedCampaign);
    this.campaignService.updateCampaign(this.selectedCampaign, this.selectedCampaign.id).subscribe(data => {
      console.log(data);
      this.initData();
    }, error => {
      console.log(error);
    });
    this.modalService.dismissAll();
  }

  onSubmitDonation() {
    this.selectedCampaign.currentAmmount += this.donationForm.value.amountToDonate;
    this.campaignService.updateCampaign(this.selectedCampaign, this.selectedCampaign.id).subscribe(data => {
      console.log(data);
      this.initData();
    }, error => {
      console.log(error);
    });
    this.modalService.dismissAll();
  }

  openDetails(targetModal: any, campaign: Campaign) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.selectedCampaign = campaign;
  }
}