import { PerseveranceCams, Rover, RoverCams, RoverDayType } from '../const';
import { CameraData, PhotosData, RoverData } from '../db';

export type LoadPhotosParams = {
  camera: RoverCams | PerseveranceCams;
  dayType: RoverDayType;
  rover: Rover;
  sol: number;
  earthDate: string;
};

export type LoadPhotosResult = {
  photos: PhotosData[];
  rovers: Map<number, RoverData>;
  cameras: Map<number, CameraData>;
};
export interface Commands extends EventTarget {
  isInit: boolean;
  init(): Promise<boolean>;
  setCurrentRover(rover: Rover): Promise<void>;
  loadPhotos({
    camera,
    dayType,
    rover,
    sol,
    earthDate,
  }: LoadPhotosParams): Promise<LoadPhotosResult>;
}
