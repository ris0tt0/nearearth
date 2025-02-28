import { AxiosResponse } from 'axios';
import { PerseveranceCams, Rover, RoverCams } from '../const';

export interface API extends EventTarget {
  init(): Promise<boolean>;
  loadManifest(rover: Rover): Promise<AxiosResponse>;
  getPhotosSol(
    rover: Rover,
    sol: number,
    camera: RoverCams | PerseveranceCams,
  ): Promise<AxiosResponse>;
  getPhotosEarthDate(
    rover: Rover,
    earthDate: string,
    camera: RoverCams | PerseveranceCams,
  ): Promise<AxiosResponse>;
}
