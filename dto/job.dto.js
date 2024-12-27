export class JobCreateDto {
  constructor(company, position) {
    this.company = company;
    this.position = position;
  }
}

export class JobUpdateDto {
  constructor(company, position, status) {
    this.company = company;
    this.position = position;
    this.status = status;
  }
}
