import {User} from "./users";

export class Campaign {
    id!:string;
    name:string;
  releaseDate:Date;
  postsSocial!:PostSocial[];
}
export class PostSocial{

  link!:string;
  initialClientsNumber!:number;
  socialMedia:SocialMediaEnum;
}

export class SocialMediaEnum{

  value!:string;
  link!:string;
  nameDisplay!:string;

}

export class SocialMedia{
  id!:string;
  link!:string;
  name!:SocialMediaEnum;
}

export class Store{
   id!:string;
   name!:string;
   location!:string;
  socialMedia!:SocialMedia[];

}
