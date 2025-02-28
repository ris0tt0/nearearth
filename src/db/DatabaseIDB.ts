import Logger from 'js-logger';
import {
  CameraData,
  Database,
  PhotoManifest,
  PhotosData,
  RequestData,
  RoverData,
} from '.';
import { Rover } from '../const';
import { EventDispatcher } from '../dispatcher';

const DB = 'mars-rovers-photos';
const DB_STORE_MANIFEST = 'manifest';
const DB_STORE_PHOTOS = 'photos';
const DB_STORE_CAMERAS = 'cameras';
const DB_STORE_ROVERS = 'rovers';
const DB_STORE_REQUEST = 'requests';
const DB_VERSION = 3;

export class DataBaseIDB extends EventDispatcher implements Database {
  private db: IDBDatabase | null = null;

  constructor() {
    super();
  }
  init(): Promise<boolean> {
    const retVal = new Promise<boolean>((resolve, reject) => {
      const request = indexedDB.open(DB, DB_VERSION);

      request.onerror = (event) => {
        reject(event);
      };
      request.onsuccess = (event) => {
        this.db = request.result;

        Logger.info('database::init');
        resolve(true);
      };
      request.onupgradeneeded = (event) => {
        this.db = request.result;
        Logger.info('database::onupgradeneeded');
        this.db.onerror = (event) => {
          Logger.info('database::onupgradeneeded::onerror', event);
        };

        if (!this.db?.objectStoreNames.contains(DB_STORE_MANIFEST)) {
          const manifestStore = this.db?.createObjectStore(DB_STORE_MANIFEST, {
            keyPath: 'name',
          });
        }
        if (!this.db?.objectStoreNames.contains(DB_STORE_PHOTOS)) {
          const photosStore = this.db?.createObjectStore(DB_STORE_PHOTOS, {
            keyPath: 'id',
          });
        }
        if (!this.db?.objectStoreNames.contains(DB_STORE_CAMERAS)) {
          const camerasStore = this.db?.createObjectStore(DB_STORE_CAMERAS, {
            keyPath: 'id',
          });
        }
        if (!this.db?.objectStoreNames.contains(DB_STORE_ROVERS)) {
          const roversStore = this.db?.createObjectStore(DB_STORE_ROVERS, {
            keyPath: 'id',
          });
        }
        if (!this.db?.objectStoreNames.contains(DB_STORE_REQUEST)) {
          const requestStore = this.db?.createObjectStore(DB_STORE_REQUEST, {
            keyPath: 'id',
          });
        }
      };
    });

    return retVal;
  }
  //
  getRequest(id: string): Promise<RequestData> {
    const retVal = new Promise<RequestData>((resolve, reject) => {
      const transaction =
        this.db?.transaction([DB_STORE_REQUEST], 'readonly') ?? null;

      if (transaction) {
        transaction.onerror = () => {
          reject();
        };

        const objectStore = transaction.objectStore(DB_STORE_REQUEST);
        const request = objectStore.get(id);

        request.onerror = () => {
          reject();
        };

        request.onsuccess = () => {
          resolve(request.result ?? null);
        };
      } else {
        reject();
      }
    });

    return retVal;
  }
  setRequests(requests: any[]): Promise<null> {
    const retVal = new Promise<null>((resolve, reject) => {
      const transaction =
        this.db?.transaction([DB_STORE_REQUEST], 'readwrite') ?? null;

      if (transaction) {
        transaction.onerror = (event) => {
          reject(event);
        };

        const objectStore = transaction.objectStore(DB_STORE_REQUEST);

        const all = requests.map((req) => {
          const retVal = new Promise<null>((resolve, reject) => {
            const request = objectStore.put(req);
            request.onerror = (event) => {
              reject(event);
            };
            request.onsuccess = () => {
              resolve(null);
            };
          });

          return retVal;
        });
        Promise.all(all)
          .then(() => resolve(null))
          .catch((error) => {
            Logger.error('IDB::setRequests', error);
            reject();
          });
      } else {
        reject();
      }
    });

    return retVal;
  }
  getPhotos(ids: number[]): Promise<PhotosData[]> {
    const retVal = new Promise<PhotosData[]>((resolve, reject) => {
      const transaction =
        this.db?.transaction([DB_STORE_PHOTOS], 'readonly') ?? null;

      if (transaction) {
        transaction.onerror = (event) => {
          reject(event);
        };

        const objectStore = transaction.objectStore(DB_STORE_PHOTOS);

        const all = ids.map((id) => {
          const retVal = new Promise<PhotosData>((resolve, reject) => {
            const request = objectStore.get(id);
            request.onerror = () => {
              reject(null);
            };
            request.onsuccess = () => {
              resolve(request.result ?? null);
            };
          });

          return retVal;
        });
        Promise.all(all)
          .then((results) => resolve(results))
          .catch((error) => {
            Logger.error('IDB::getPhotos', error);
            reject(error);
          });
      } else {
        reject([]);
      }
    });

    return retVal;
  }
  setPhotos(photos: any[]): Promise<null> {
    const retVal = new Promise<null>((resolve, reject) => {
      const transaction =
        this.db?.transaction([DB_STORE_PHOTOS], 'readwrite') ?? null;

      if (transaction) {
        transaction.onerror = (event) => {
          reject(event);
        };

        const objectStore = transaction.objectStore(DB_STORE_PHOTOS);

        const all = photos.map((photo) => {
          const retVal = new Promise<null>((resolve, reject) => {
            const request = objectStore.put(photo);
            request.onerror = (event) => {
              reject(event);
            };
            request.onsuccess = () => {
              resolve(null);
            };
          });

          return retVal;
        });
        Promise.all(all)
          .then(() => resolve(null))
          .catch((error) => {
            Logger.error('IDB::setPhotos', error);
            reject();
          });
      } else {
        reject();
      }
    });

    return retVal;
  }
  getRovers(ids: number[]): Promise<RoverData[]> {
    const retVal = new Promise<any[]>((resolve, reject) => {
      const transaction =
        this.db?.transaction([DB_STORE_ROVERS], 'readonly') ?? null;

      if (transaction) {
        transaction.onerror = () => {
          reject([]);
        };

        const objectStore = transaction.objectStore(DB_STORE_ROVERS);

        const all = ids.map((id) => {
          const retVal = new Promise<RoverData>((resolve, reject) => {
            const request = objectStore.get(id);
            request.onerror = () => {
              reject(null);
            };
            request.onsuccess = () => {
              resolve(request.result ?? null);
            };
          });

          return retVal;
        });
        Promise.all(all)
          .then((results) => resolve(results))
          .catch((error) => {
            Logger.error('IDB::getRovers', error);
            reject([]);
          });
      } else {
        reject([]);
      }
    });

    return retVal;
  }
  setRovers(rovers: RoverData[]): Promise<null> {
    const retVal = new Promise<null>((resolve, reject) => {
      const transaction =
        this.db?.transaction([DB_STORE_ROVERS], 'readwrite') ?? null;

      if (transaction) {
        transaction.onerror = (event) => {
          reject(event);
        };

        const objectStore = transaction.objectStore(DB_STORE_ROVERS);

        const all = rovers.map((rover) => {
          const retVal = new Promise<null>((resolve, reject) => {
            const request = objectStore.put(rover);
            request.onerror = (event) => {
              reject(event);
            };
            request.onsuccess = () => {
              resolve(null);
            };
          });

          return retVal;
        });
        Promise.all(all)
          .then(() => resolve(null))
          .catch((error) => {
            Logger.error('IDB::setRovers', error);
            reject();
          });
      } else {
        reject();
      }
    });
    return retVal;
  }
  getCameras(ids: number[]): Promise<CameraData[]> {
    const retVal = new Promise<any[]>((resolve, reject) => {
      const transaction =
        this.db?.transaction([DB_STORE_CAMERAS], 'readonly') ?? null;

      if (transaction) {
        transaction.onerror = () => {
          reject([]);
        };

        const objectStore = transaction.objectStore(DB_STORE_CAMERAS);

        const all = ids.map((id) => {
          const retVal = new Promise<CameraData>((resolve, reject) => {
            const request = objectStore.get(id);
            request.onerror = () => {
              reject(null);
            };
            request.onsuccess = () => {
              resolve(request.result ?? null);
            };
          });

          return retVal;
        });
        Promise.all(all)
          .then((results) => resolve(results))
          .catch((error) => {
            Logger.error('IDB::getCameras', error);
            reject([]);
          });
      } else {
        reject([]);
      }
    });
    return retVal;
  }
  setCameras(cameras: any[]): Promise<null> {
    const retVal = new Promise<null>((resolve, reject) => {
      const transaction =
        this.db?.transaction([DB_STORE_CAMERAS], 'readwrite') ?? null;

      if (transaction) {
        transaction.onerror = (event) => {
          reject(event);
        };

        const objectStore = transaction.objectStore(DB_STORE_CAMERAS);

        const all = cameras.map((camera) => {
          const retVal = new Promise<null>((resolve, reject) => {
            const request = objectStore.put(camera);
            request.onerror = (event) => {
              reject(event);
            };
            request.onsuccess = () => {
              resolve(null);
            };
          });

          return retVal;
        });
        Promise.all(all)
          .then(() => resolve(null))
          .catch((error) => {
            Logger.error('IDB::setCameras', error);
            reject();
          });
      } else {
        reject();
      }
    });
    return retVal;
  }
  getManifest(rover: Rover): Promise<PhotoManifest | null> {
    const retVal = new Promise<PhotoManifest | null>((resolve, reject) => {
      const transaction =
        this.db?.transaction([DB_STORE_MANIFEST], 'readonly') ?? null;

      if (transaction) {
        transaction.onerror = () => {
          reject(null);
        };

        const objectStore = transaction.objectStore(DB_STORE_MANIFEST);
        const request = objectStore.get(rover);

        request.onerror = () => {
          reject(null);
        };

        request.onsuccess = () => {
          resolve(request.result ?? null);
        };
      } else {
        reject(null);
      }
    });

    return retVal;
  }
  setManifests(datas: PhotoManifest[]) {
    const retVal = new Promise<void>((resolve, reject) => {
      const transaction =
        this.db?.transaction([DB_STORE_MANIFEST], 'readwrite') ?? null;

      if (transaction) {
        transaction.onerror = (event) => {
          reject(event);
        };

        const objectStore = transaction.objectStore(DB_STORE_MANIFEST);

        const all = datas.map((data) => {
          const retVal = new Promise<null>((resolve, reject) => {
            const request = objectStore.put(data);
            request.onerror = (event) => {
              reject(event);
            };
            request.onsuccess = () => {
              resolve(null);
            };
          });

          return retVal;
        });
        Promise.all(all)
          .then(() => resolve())
          .catch((error) => {
            Logger.error('IDB::setManifest', error);
            reject();
          });
      } else {
        reject();
      }
    });

    return retVal;
  }
}
