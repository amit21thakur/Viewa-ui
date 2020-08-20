export class LoginModel {
  public username: string;
  public password: string;

  constructor(id: string, pwd: string) {
    this.username = id;
    this.password = pwd;
  }
}
