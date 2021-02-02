export class TokenRequestDTO {
  public audience: string;
  public client_id: string;
  public grant_type: string;

  constructor() {
    this.audience = 'https://api.bravenewcoin.com';
    this.client_id = 'oCdQoZoI96ERE9HY3sQ7JmbACfBf55RY';
    this.grant_type = 'client_credentials';
  }

}
