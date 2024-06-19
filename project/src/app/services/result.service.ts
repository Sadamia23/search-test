import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISchoolRoot } from '../interfaces/school.model';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  schoolsResult!: ISchoolRoot;
  showOnlyPublic: boolean = false;
  showOnlyPrivate: boolean = false;
  selectedDistricts: string[] = [];

  id!: number;
  constructor(private _http: HttpClient) {}
  getResultsFromAPI(regionID: number, i: number = 1) {
    const targetUrl = `https://skolebi.emis.ge/back/school/search?page=${i}&size=24&regions=${regionID}`;
    const encodedTargetUrl = encodeURIComponent(targetUrl);
    const proxyUrl = `http://localhost:3000/proxy?targetUrl=${encodedTargetUrl}`;
    return this._http.get<ISchoolRoot>(proxyUrl);
  }
  setResults(result: ISchoolRoot) {
    this.schoolsResult = result;
  }
  toggleOnlyPublicButton() {
    this.showOnlyPrivate = false
    this.showOnlyPublic = !this.showOnlyPublic;
  }
  toggleOnlyPrivateButton(){
    this.showOnlyPublic = false;
    this.showOnlyPrivate = !this.showOnlyPrivate
  }
}
