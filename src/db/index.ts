import { Initable } from '../base';

export type CloseApproachDataMissDistance = {
  astronomical: string;
  kilometers: string;
  lunar: string;
  miles: string;
};

export type CloseApproachDataRelativeVelocity = {
  kilometers_per_hour: string;
  kilometers_per_second: string;
  miles_per_hour: string;
};

export type CloseApproachData = {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  miss_distance: CloseApproachDataMissDistance;
  orbiting_body: string;
  relative_velocity: CloseApproachDataRelativeVelocity;
};

export type NearEarthObjectEstimatedDiameter = {
  feet: string;
  kilometers: string;
  meters: string;
  miles: string;
};

export type NearEarthObjectLinks = {
  self: string;
};

export type NearEarthObjectOrbitalDataOrbitClass = {
  orbit_class_description: string;
  orbit_class_range: string;
  orbit_class_type: string;
};

export type NearEarthObjectOrbitalData = {
  aphelion_distance: string;
  ascending_node_longitude: string;
  data_arc_in_days: number;
  eccentricity: string;
  epoch_osculation: string;
  equinox: string;
  first_observation_date: string;
  inclination: string;
  jupiter_tisserand_invariant: string;
  last_observation_date: string;
  mean_anomaly: string;
  mean_motion: string;
  minimum_orbit_intersection: string;
  observations_used: number;
  orbit_class: NearEarthObjectOrbitalDataOrbitClass;
  orbit_determination_date: string;
  orbit_id: string;
  orbit_uncertainty: string;
  orbital_period: string;
  perihelion_argument: string;
  perihelion_distance: string;
  perihelion_time: string;
  semi_major_axis: string;
};

export type NearEarthObject = {
  id: string;
  absolute_magnitude_h: number;
  close_approach_data: CloseApproachData[];
  designation: string;
  estimated_diameter: NearEarthObjectEstimatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  is_sentry_object: boolean;
  links: NearEarthObjectLinks;
  name: string;
  nasa_jpl_url: string;
  neo_reference_id: string;
  orbital_data: NearEarthObjectOrbitalData;
};

export interface NeoDb extends Initable {
  getNeo(id: string): Promise<NearEarthObject | null>;
  setNeo(neo: NearEarthObject): Promise<void>;
}
