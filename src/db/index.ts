import { Rover } from '../const';

export type PhotoManifest = {
  landingDate: string;
  launchDate: string;
  maxDate: string;
  maxSol: number;
  name: string;
  status: string;
  totalPhotos: number;
  photos: Record<string | number, PhotoData>;
  saved: number;
};

export type PhotoData = {
  cameras: string[];
  earthDate: string;
  sol: number;
  totalPhotos: number;
};

export type RequestData = {
  id: string;
  photoIds: number[];
};

export type PhotosData = {
  cameraId: number;
  earthDate: string;
  id: number;
  imgSrc: string;
  roverId: number;
};

export type CameraData = {
  id: number;
  name: string; // "FHAZ"
  roverId: number; // RoverData instance id.
  fullName: string; // "Front Hazard Avoidance Camera"
};

export type RoverData = {
  id: number;
  name: string; // "Curiosity"
  landingDate: string; // "2012-08-06"
  launchDate: string; // "2011-11-26"
  status: string; // "active"
};

export interface Database extends EventTarget {
  init(): Promise<boolean>;
  getManifest(rover: Rover): Promise<PhotoManifest | null>;
  setManifests(datas: PhotoManifest[]): Promise<void>;
  getPhotos(ids: number[]): Promise<PhotosData[]>;
  setPhotos(photos: any[]): Promise<null>;
  getRequest(id: string): Promise<RequestData>;
  setRequests(requests: any[]): Promise<null>;
  getRovers(ids: number[]): Promise<RoverData[]>;
  setRovers(rovers: RoverData[]): Promise<null>;
  getCameras(ids: number[]): Promise<CameraData[]>;
  setCameras(cameras: any[]): Promise<null>;
}
