import { ResourceState } from './enum/ResourceState';

// tslint:disable: variable-name
export class Athlete {
  constructor(
    public id: number,
    public resource_state: ResourceState,
    public firstname: string,
    public lastname: string,
    public profile_medium: string,
    public profile: string,
    public city: string,
    public state: string,
    public country: string,
    public sex: string,
    public premium: boolean,
    public summit: boolean,
    public created_at: Date,
    public updated_at: Date,
    public follower_count: number,
    public friend_count: number,
    public measurement_preference: string,
    public ftp: number,
    public weight: number,
    public clubs: any,
    public bikes: any,
    public shoes: any
  ) {}
}

export interface MetaAthlete {
  id: number;
  resource_state: number;
}
