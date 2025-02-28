import { create } from 'zustand';
import { PerseveranceCams, Rover, RoverCams, RoverDayType } from './const';
import { PhotoManifest } from './db';

export type CameraResult = {
  id: number;
  fullName: string;
  name: string;
  rover: RoverResult;
};

export type RoverResult = {
  id: number;
  landingDate: string;
  launchDate: string;
  name: string;
  status: string;
};

export type PhotosResult = {
  camera: CameraResult | null;
  rover: RoverResult | null;
  earthDate: string;
  id: number;
  imgSrc: string;
};

export type PhotoStoreState = {
  rover: Rover | '';
  roverData: PhotoManifest | null;
  dayType: RoverDayType;
  sol: number;
  date: Date;
  camera: RoverCams | PerseveranceCams | '';
  photosResult: PhotosResult | null;
  photosResultList: PhotosResult[] | null;
  setPhotosResult: (photosResult: PhotosResult | null) => void;
  setPhotosResultList: (photosResultList: PhotosResult[] | null) => void;
  setSol: (sol: number) => void;
  setDate: (date: Date) => void;
  setRover: (rover: Rover | '') => void;
  setRoverData: (roverData: PhotoManifest | null) => void;
  setDayType: (dayType: RoverDayType) => void;
  setCamera: (camera: RoverCams | PerseveranceCams | '') => void;
};

export const usePhotosStore = create<PhotoStoreState>((set) => ({
  rover: '',
  roverData: null,
  dayType: 'sol',
  sol: 1,
  camera: '',
  date: new Date(),
  photosResult: null,
  photosResultList: null,
  setPhotosResult: (photosResult: PhotosResult | null) => set({ photosResult }),
  setPhotosResultList: (photosResultList: PhotosResult[] | null) =>
    set({ photosResultList }),
  setSol: (sol: number) => set({ sol }),
  setDate: (date: Date) => set({ date }),
  setRover: (rover: Rover | '') => set({ rover }),
  setRoverData: (roverData: PhotoManifest | null) => set({ roverData }),
  setDayType: (dayType: RoverDayType) => set({ dayType }),
  setCamera: (camera) => set({ camera }),
}));
