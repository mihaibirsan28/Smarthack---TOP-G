import {User} from "./users";

export class Campaign {
  id!: string;
  descritpion!: string;
  campaignGoal!: number;
  currentAmmount: number = 0;
  requester!: User;
  /*
  constructor(
    id: string,
    description: string,
    campaignGoal: number,
    currentAmount: number,
    requester: User

  ) {
    this.id = id;
    this.descritpion = description;
    this.campaignGoal = campaignGoal;
    this.currentAmmount = currentAmount;
    this.requester = requester;
  }
  */


}
