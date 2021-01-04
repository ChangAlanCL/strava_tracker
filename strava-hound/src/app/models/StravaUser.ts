import { Athlete } from './Athlete';

// tslint:disable: variable-name
export class StravaUser {
  constructor(
    public token_type: string,
    public expires_at: number,
    public expires_in: number,
    public refresh_token: string,
    public access_token: string,
    public athlete: Athlete
  ) {}
}
