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

        db.createObjectStore('neo', { keyPath: 'id' });
        db.createObjectStore('browse', { keyPath: 'id' });
        db.createObjectStore('date', { keyPath: 'id' });
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
  setNeo(neo: NearEarthObject) {
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

  getBrowse(id: string) {
    const retVal = new Promise<any | null>((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(['browse'], 'readonly');
        const objectStore = transaction.objectStore('browse');
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
  setBrowse(browse: any) {
    const retVal = new Promise<void>((resolve, reject) => {
      if (this.db) {
        if (this.db) {
          const transaction = this.db.transaction(['browse'], 'readwrite');
          const objectStore = transaction.objectStore('browse');
          const request = objectStore.add(browse);
          request.onsuccess = (e) => {
            resolve();
          };
          request.onerror = (e) => {
            reject(e);
          };
        } else {
          reject('database not init');
        }
      } else {
        reject('database not init');
      }
    });

    return retVal;
  }

  getNeoDate(id: string) {
    const retVal = new Promise<any | null>((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(['date'], 'readonly');
        const objectStore = transaction.objectStore('date');
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
  setNeoDate(browse: any) {
    const retVal = new Promise<void>((resolve, reject) => {
      if (this.db) {
        if (this.db) {
          const transaction = this.db.transaction(['date'], 'readwrite');
          const objectStore = transaction.objectStore('date');
          const request = objectStore.add(browse);
          request.onsuccess = (e) => {
            resolve();
          };
          request.onerror = (e) => {
            reject(e);
          };
        } else {
          reject('database not init');
        }
      } else {
        reject('database not init');
      }
    });

    return retVal;
  }
}
