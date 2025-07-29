import { Initable } from '../base';
import { NearEarthObject } from '../db';

export interface NeoCommands extends Initable {
  requestNeo(id: string): Promise<NearEarthObject>;
  requestNeoBrowse(page: number, size: number): Promise<any>;
}
