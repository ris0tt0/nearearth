import Logger from 'js-logger';
import { Commands, LoadPhotosParams, LoadPhotosResult } from '.';
import { API } from '../api';
import { Rover } from '../const';
import {
  CameraData,
  Database,
  PhotoData,
  PhotoManifest,
  PhotosData,
  RoverData,
} from '../db';
import { EventDispatcher } from '../dispatcher';

export type CommandsImplParams = {
  database: Database;
  api: API;
  setRover: (rover: Rover | '') => void;
  setRoverData: (roverData: PhotoManifest | null) => void;
};

const WAIT_MS = 24 * 60 * 60 * 1000;
export class CommandsImpl extends EventDispatcher implements Commands {
  private database: Database | null = null;
  private api: API | null;
  private setRover: (rover: Rover | '') => void;
  private setRoverData: (roverData: PhotoManifest | null) => void;

  isInit: boolean = false;

  constructor({ database, api, setRover, setRoverData }: CommandsImplParams) {
    super();

    this.database = database;
    this.api = api;
    this.setRover = setRover;
    this.setRoverData = setRoverData;
  }

  private loadRoverManifest = async (name: Rover) => {
    const stored = await this.database?.getManifest(name);

    if (stored) {
      const wait = stored.saved + WAIT_MS > Date.now();
      const isCurrentlyActive = stored.status === 'active' && !wait;
      if (!isCurrentlyActive) {
        return stored;
      }
    }

    const manifest = await this.api?.loadManifest(name);

    if (manifest?.data.photo_manifest) {
      const photos: Record<string | number, PhotoData> = {};

      manifest.data.photo_manifest.photos.forEach((photo: any) => {
        const result: PhotoData = {
          cameras: photo.cameras,
          earthDate: photo.earth_date,
          sol: photo.sol,
          totalPhotos: photo.total_photos,
        };

        photos[photo.sol] = result;
        photos[photo.earth_date] = result;
      });

      const result: PhotoManifest = {
        name: manifest.data.photo_manifest.name?.toLowerCase(),
        landingDate: manifest.data.photo_manifest.landing_date,
        launchDate: manifest.data.photo_manifest.launch_date,
        status: manifest.data.photo_manifest.status,
        maxSol: manifest.data.photo_manifest.max_sol,
        maxDate: manifest.data.photo_manifest.max_date,
        totalPhotos: manifest.data.photo_manifest.total_photos,
        saved: Date.now(),
        photos,
      };

      await this.database?.setManifests([result]);

      return result;
    }

    return null;
  };

  private loadAllManifests = async () => {
    await Promise.all([
      this.loadRoverManifest('spirit'),
      this.loadRoverManifest('curiosity'),
      this.loadRoverManifest('opportunity'),
      this.loadRoverManifest('perseverance'),
    ]);

    return true;
  };

  init = async (): Promise<boolean> => {
    await this.api?.init();
    await this.database?.init();

    await this.loadAllManifests();

    this.isInit = true;
    const init = new Event('init');
    this.dispatchEvent(init);

    return true;
  };
  setCurrentRover = async (rover: Rover) => {
    this.setRover(rover);
    const data = await this.database?.getManifest(rover);
    Logger.info('setCurrentRover', rover, data);
    if (data) {
      this.setRoverData(data);
    }
  };
  loadPhotos = async ({
    camera,
    dayType,
    rover,
    sol,
    earthDate,
  }: LoadPhotosParams) => {
    Logger.info('loadPhotos', camera, dayType, rover, sol, earthDate);

    if (dayType === 'sol') {
      const id = `${rover}-${sol}-${camera}`;

      const stored = await this.database?.getRequest(id);
      Logger.info('stored', id, stored);
      if (!stored) {
        const request = await this.api?.getPhotosSol(rover, sol, camera);
        if (Array.isArray(request?.data.photos)) {
          const photoIds: string[] = [];
          const cameras = new Map<number, CameraData>();
          const rovers = new Map<number, RoverData>();
          const photos: PhotosData[] = request.data.photos.map((photo: any) => {
            photoIds.push(photo.id);

            cameras.set(photo.camera.id, {
              id: photo.camera.id,
              name: photo.camera.name,
              roverId: photo.camera.rover_id,
              fullName: photo.camera.full_name,
            });

            rovers.set(photo.rover.id, {
              id: photo.rover.id,
              landingDate: photo.rover.landing_date,
              launchDate: photo.rover.launch_date,
              name: photo.rover.name,
              status: photo.rover.status,
            });

            return {
              id: photo.id,
              sol: photo.sol,
              cameraId: photo.camera.id,
              imgSrc: photo.img_src,
              earthDate: photo.earth_date,
              roverId: photo.rover.id,
            };
          });

          await this.database?.setPhotos(photos);
          await this.database?.setRovers(Array.from(rovers.values()));
          await this.database?.setCameras(Array.from(cameras.values()));
          await this.database?.setRequests([{ id, photoIds }]);

          Logger.info('photos1', photos, cameras, rovers);

          return { photos, cameras, rovers };
        }
      } else {
        const roversSet = new Set<number>();
        const camerasSet = new Set<number>();
        const photos = (await this.database?.getPhotos(stored.photoIds)) ?? [];

        photos.forEach((photo) => {
          roversSet.add(photo.roverId);
          camerasSet.add(photo.cameraId);
        });

        const rovers =
          (await this.database?.getRovers(Array.from(roversSet))) ?? [];
        const cameras =
          (await this.database?.getCameras(Array.from(camerasSet))) ?? [];

        const roversMap = rovers.reduce((retVal, rover) => {
          retVal.set(rover.id, rover);
          return retVal;
        }, new Map<number, RoverData>());

        const camerasMap = cameras.reduce((retVal, camera) => {
          retVal.set(camera.id, camera);
          return retVal;
        }, new Map<number, CameraData>());

        Logger.info('photos2', photos, camerasMap, roversMap);

        return { photos, cameras: camerasMap, rovers: roversMap };
      }
    }
    Logger.warn('loadPhotos', 'no photos');
    const photos: PhotosData[] = [];
    const cameras = new Map<number, CameraData>();
    const rovers = new Map<number, RoverData>();

    return { photos, cameras, rovers };
  };
}
