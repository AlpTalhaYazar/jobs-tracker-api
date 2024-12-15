export class RegisterDto {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export class LoginDto {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}
