export interface Initable {
  isInit: boolean;
  init(): Promise<void>;
}
