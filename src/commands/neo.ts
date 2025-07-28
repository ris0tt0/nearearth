import { NeoCommands } from '.';
import { NeoApi } from '../api';
import { NeoApiImpl } from '../api/neo';
import { NeoDb } from '../db';
import { NeoDbImpl } from '../db/neo';

export class NeoCommandsImpl implements NeoCommands {
  isInit: boolean = false;

  private api: NeoApi;
  private db: NeoDb;

  protected static instance: NeoCommands | null = null;

  static getInstance(): NeoCommands {
    if (NeoCommandsImpl.instance === null) {
      const db: NeoDb = new NeoDbImpl();
      const api: NeoApi = new NeoApiImpl();

      NeoCommandsImpl.instance = new NeoCommandsImpl(db, api);
    }

    return NeoCommandsImpl.instance;
  }

  private constructor(db: NeoDb, api: NeoApi) {
    this.api = api;
    this.db = db;
  }

  async init() {
    await this.db.init();
    await this.api.init();

    this.isInit = true;
    return;
  }

  async requestNeo(id: string) {
    const neo = await this.db.getNeo(id);
    if (neo) {
      return neo;
    }

    const request = await this.api.getNeo(id);

    await this.db.setNeo(request.data);

    return request.data;
  }
}
