import Logger from 'js-logger';
import { NearEarthObject, NeoDb } from '.';

const dbName = 'jay-neo';

export class NeoDbImpl implements NeoDb {
  isInit: boolean = false;

  protected db: IDBDatabase | null = null;

  init() {
    const retVal = new Promise<void>((resolve, reject) => {
      if (this.isInit) return resolve();
      const request = indexedDB.open(dbName, 1);

      request.onerror = (event) => {
        reject(event);
      };
      request.onsuccess = () => {
        this.db = request.result;
        this.isInit = true;
        resolve();
      };
      request.onupgradeneeded = () => {
        const db = request.result;

        const objectStore = db.createObjectStore('neo', { keyPath: 'id' });
      };
    });

    return retVal;
  }

  getNeo(id: string) {
    const retVal = new Promise<NearEarthObject | null>((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(['neo'], 'readonly');
        const objectStore = transaction.objectStore('neo');
        const request = objectStore.get(id);
        request.onsuccess = (e) => {
          resolve(request.result ?? null);
        };
        request.onerror = (e) => {
          reject(e);
        };
      } else {
        reject('database not init');
      }
    });

    return retVal;
  }
  async setNeo(neo: NearEarthObject) {
    Logger.info('NeoDbImpl::setNeo', neo);
    const retVal = new Promise<void>((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(['neo'], 'readwrite');
        const objectStore = transaction.objectStore('neo');
        const request = objectStore.add(neo);
        request.onsuccess = (e) => {
          resolve();
        };
        request.onerror = (e) => {
          reject(e);
        };
      } else {
        reject('database not init');
      }
    });

    return retVal;
  }
}
