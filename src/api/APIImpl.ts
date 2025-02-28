import Logger from 'js-logger';
import { API } from '.';
import { EventDispatcher } from '../dispatcher';
import axios, { AxiosInstance } from 'axios';
import { PerseveranceCams, Rover, RoverCams } from '../const';

const api_key = process.env.REACT_APP_API_KEY ?? 'DEMO_KEY';

const config = {
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1',
  params: { api_key },
};

export class APIImpl extends EventDispatcher implements API {
  private axios: AxiosInstance;

  constructor() {
    super();
    this.axios = axios.create(config);
  }
  loadManifest = async (rover: Rover) => {
    const request = await this.axios.get(`/manifests/${rover}`);
    return request;
  };
  getPhotosSol = async (
    rover: Rover,
    sol: number,
    camera: RoverCams | PerseveranceCams,
  ) => {
    const request = await this.axios.get(`/rovers/${rover}/photos`, {
      params: { sol, camera },
    });
    return request;
  };
  getPhotosEarthDate = async (
    rover: Rover,
    earthDate: string,
    camera: RoverCams | PerseveranceCams,
  ) => {
    const request = await this.axios.get(`/rovers/${rover}/photos`, {
      params: { earth_date: earthDate, camera },
    });
    return request;
  };

  init = async () => {
    Logger.info('APIImpl::init', api_key);
    return true;
  };
}
