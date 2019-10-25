import {ProjectConfig} from 'entity/common';

export class API {
  public getProjectConfig(): Promise<ProjectConfig> {
    return Promise.resolve({title: 'Medux Demo'});
  }
}

export default new API();
