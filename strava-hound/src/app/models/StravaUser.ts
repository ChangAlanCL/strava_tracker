import { Athlete } from './Athlete';

// tslint:disable: variable-name
export class StravaToken {
  constructor(
    public token_type: string,
    public expires_at: number,
    public expires_in: number,
    public refresh_token: string,
    public access_token: string
  ) {}
}

export class StravaUser extends StravaToken {
  constructor(
    public token_type: string,
    public expires_at: number,
    public expires_in: number,
    public refresh_token: string,
    public access_token: string,
    public athlete: Athlete
  ) {
    super(token_type, expires_at, expires_in, refresh_token, access_token);
  }
}
