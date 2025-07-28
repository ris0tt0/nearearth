import axios, { AxiosInstance } from 'axios';
import { NeoApi } from '.';

// feed
//GET https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY

// lookup
// https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=DEMO_KEY

// browse
// https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY

const api_key = process.env.NASA_API_KEY;

const config = {
  baseURL: 'https://api.nasa.gov/neo/rest/v1',
  params: { api_key },
};

export class NeoApiImpl implements NeoApi {
  isInit: boolean = false;
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create(config);
  }

  async init() {
    this.isInit = true;
    return;
  }

  async getNeo(neoId: string) {
    const request = await this.axios.get(`/neo/${neoId}`);
    return request;
  }

  async getNeoFeed(startDate: string, endDate?: string) {
    const request = await this.axios.get(`/feed`, {
      params: { start_date: startDate, end_date: endDate },
    });
    return request;
  }
}
