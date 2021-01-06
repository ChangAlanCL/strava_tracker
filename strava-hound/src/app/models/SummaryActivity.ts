import { MetaAthlete } from './Athlete';
import { ActivityType } from './enum/ActivityType';
import { PolylineMap } from './PolylineMap';

export interface SummaryActivity {
  id: number;
  external_id: number;
  upload_id: number;
  athlete: MetaAthlete;
  name: string;
  /** The activity's distance, in meters */
  distance: number;
  /** The activity's moving time, in seconds */
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  elev_high: number;
  elev_low: number;
  type: ActivityType;
  start_date: Date;
  start_date_local: Date;
  timezone: string;
  start_latlng: number;
  end_latlng: number;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  total_photo_count: number;
  map: PolylineMap;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  workout_type: boolean;
  update_id_str: string;
  average_speed: number;
  max_speed: number;
  has_kudoed: boolean;
  gear_id: string;
  kilojoules: number;
  average_watts: number;
  /** Whether the watts are from a power meter, false if estimated */
  device_watts: boolean;
  max_watts: number;
  weighted_average_watts: number;
  has_heartrate: boolean;
  heartrate_opt_out: boolean;
  average_cadence: number;
  average_heartrate: number;
  average_temp: number;
}
