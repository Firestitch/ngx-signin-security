import { FS_SIGNIN_SECURITY_CONFIG } from './../injectors/singin-security-config.injector';
import { FsSigninSecurityConfig } from './../interfaces/signin-security-config';
import { Injectable, Inject } from '@angular/core';
import * as _snakecaseKeys from 'snakecase-keys';
import * as _camelcaseKeys from 'camelcase-keys';
import { isArray } from 'lodash-es';

const snakecaseKeys = _snakecaseKeys;
const camelcaseKeys = _camelcaseKeys;

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(@Inject(FS_SIGNIN_SECURITY_CONFIG) private _config: FsSigninSecurityConfig) {}

  public input(data) {
    if (isArray(data)) {
      return data.map(item => {
        return this._config.case === 'snake' ? camelcaseKeys(item, { deep: true }) : item;
      });
    } else {
      return this._config.case === 'snake' ? camelcaseKeys(data, { deep: true }) : data;
    }
  }

  public output(data) {
    if (isArray(data)) {
      return data.map(item => {
        return this._config.case === 'snake' ? snakecaseKeys(item) : item;
      });
    } else {
      return this._config.case === 'snake' ? snakecaseKeys(data) : data;
    }
  }
}
