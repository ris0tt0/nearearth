import { Initable } from '../base';

export interface NeoApi extends Initable {
  /**
   * Lookup a specific Asteroid based on its NASA JPL small body (SPK-ID) ID
   * @param neoId the near earth object id.
   */
  getNeo(neoId: string): Promise<any>;
  /**
   * Retrieve a list of Asteroids based on their closest approach date to Earth.
   * @param startDate Starting date for asteroid search
   * @param endDate Ending date for asteroid search
   */
  getNeoFeed(startDate: string, endDate?: string): Promise<any>;
}
