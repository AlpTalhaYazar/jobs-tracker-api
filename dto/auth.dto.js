export class RegisterDto {
  constructor(name, email, password) {
    this.name = name;
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
