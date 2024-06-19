import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDistrict, IRegions } from '../interfaces/regions.model';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  constructor(private _http: HttpClient) {}

  getRegionDistricts(id: number) {
    return this._http.get<IDistrict[]>(
      `http://localhost:3000/proxy?targetUrl=https://skolebi.emis.ge/back/school/district?regionId=${id}`
    );
  }
  getRegions() {
    return this._http.get<IRegions[]>(
      'http://localhost:3000/proxy?targetUrl=https://skolebi.emis.ge/back/school/region'
    );
  }
}
