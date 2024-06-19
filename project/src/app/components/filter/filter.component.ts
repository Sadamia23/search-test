import { Component } from '@angular/core';
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
  regions: IRegions[] = [];

  districts: IDistrict[] = [];
  constructor(
    private fb: FormBuilder,
    private _RegionService: RegionService,
    public resultService: ResultService,
    private router: Router
  ) {
    this._RegionService.getRegions().subscribe((regions) => {
      this.regions = regions;
    });
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
      this.resultService.selectedDistricts = selectedDistricts;
    });
  }

  showSelectedValues() {
    this.resultService
      .getResultsFromAPI(this.selectedRegion)
      .subscribe((result) => {
        this.resultService.setResults(result);
        this.resultService.id = this.selectedRegion;
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

// https://skolebi.emis.ge/back/school/region
// https://skolebi.emis.ge/back/school/search?page=1&size=24&regions=1010
// ც
// https://skolebi.emis.ge/back/school/search/378
// https://skolebi.emis.ge/back/school/district?regionId=1009
// https://skolebi.emis.ge/back/school/educationprogram
// https://skolebi.emis.ge/back/school/sector

// https://ng.ant.design/components/select/en
