import { Initable } from '../base';
import { FeedRequest, NearEarthObject } from '../db';

export interface NeoCommands extends Initable {
  requestNeo(id: string): Promise<NearEarthObject>;
  requestNeoBrowse(page: number, size: number): Promise<any>;
  requestNeoDate(date: string): Promise<FeedRequest>;
}
