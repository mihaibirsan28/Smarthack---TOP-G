export class User {
  id: string;
  email: string;
  name: string;
  birthday: Date;
  constructor(id: string, email: string, name: string, birthday: Date){
    this.id = id;
    this.email = email;
    this.name = name;
    this.birthday = birthday;
  }
}
