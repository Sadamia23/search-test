import { Component } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { IDistrict, IRegions } from '../../interfaces/regions.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegionService } from '../../services/region.service';
import { ResultService } from '../../services/result.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  form!: FormGroup;
  selectedRegion!: number;
  selectedDistricts: string[] = [];
  regions: IRegions[] = [
    {
      id: 1009,
      name: 'თბილისი',
    },
    {
      id: 1000,
      name: 'აფხაზეთი',
    },
    {
      id: 1005,
      name: 'აჭარა',
    },
    {
      id: 1006,
      name: 'გურია',
    },
    {
      id: 1007,
      name: 'იმერეთი',
    },
    {
      id: 1003,
      name: 'კახეთი',
    },
    {
      id: 1004,
      name: 'მცხეთა-მთიანეთი',
    },
    {
      id: 1011,
      name: 'რაჭა-ლეჩხუმი და ქვემო სვანეთი',
    },
    {
      id: 1008,
      name: 'სამეგრელო-ზემო სვანეთი',
    },
    {
      id: 1001,
      name: 'სამცხე-ჯავახეთი',
    },
    {
      id: 1002,
      name: 'ქვემო ქართლი',
    },
    {
      id: 1010,
      name: 'შიდა ქართლი',
    },
  ];

  districts: IDistrict[] = [];
  constructor(
    private fb: FormBuilder,
    private _RegionService: RegionService,
    private _resultService: ResultService,
    private router: Router
  ) {
    this.form = this.fb.group({
      region: [null],
      districts: [[]],
    });
  }

  ngOnInit() {
    this.form.get('region')?.valueChanges.subscribe((selectedRegion) => {
      this.selectedRegion = selectedRegion;
    });

    this.form.get('districts')?.valueChanges.subscribe((selectedDistricts) => {
      this.selectedDistricts = selectedDistricts;
    });
  }

  showSelectedValues() {
    console.log('Selected Region:', this.selectedRegion);
    console.log('Selected Districts:', this.selectedDistricts);
    let pages = 0;
    this._resultService
      .getResultsFromAPI(this.selectedRegion)
      .subscribe((result) => {
        this._resultService.setResults(result);
        this._resultService.id = this.selectedRegion;
        this.router.navigate(['/schools']);
      });
  }

  getDistricts() {
    this.form.get('districts')?.reset([]);
    this._RegionService
      .getRegionDistricts(this.selectedRegion)
      .subscribe((districts) => {
        this.districts = districts;
      });
  }
}
// for (let i = 1; 1 <= pages; i++) {
//   this._SchoolService
//     .getResults(this.selectedRegion, i)
//     .subscribe((data) => {
//       console.log(data);
//     });
// }
// https://skolebi.emis.ge/back/school/region
// https://skolebi.emis.ge/back/school/search?page=1&size=24&regions=1010
// https://skolebi.emis.ge/back/school?page=1&size=24&search=ოზურგეთი
// https://skolebi.emis.ge/back/school/search/378
// https://skolebi.emis.ge/back/school/district?regionId=1009
// https://skolebi.emis.ge/back/school/educationprogram
// https://skolebi.emis.ge/back/school/sector

// https://ng.ant.design/components/select/en
