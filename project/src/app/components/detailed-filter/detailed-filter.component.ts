import { Component } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { IDistrict, IRegions } from '../../interfaces/regions.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegionService } from '../../services/region.service';

@Component({
  selector: 'app-detailed-filter',
  templateUrl: './detailed-filter.component.html',
  styleUrl: './detailed-filter.component.scss',
})
export class DetailedFilterComponent {
  form!: FormGroup;
  regions: IRegions[] = [];
  selectedRegion!: number;
  districts: IDistrict[] = [];

  constructor(
    public resultService: ResultService,
    private _regionsService: RegionService,
    private fb: FormBuilder
  ) {
    this._regionsService.getRegions().subscribe((regions) => {
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

  loadSelectedValues() {
    this.resultService
      .getResultsFromAPI(this.selectedRegion)
      .subscribe((result) => {
        this.resultService.setResults(result);
        this.resultService.id = this.selectedRegion;
      });
  }

  getDistricts() {
    this.form.get('districts')?.reset([]);
    this._regionsService
      .getRegionDistricts(this.selectedRegion)
      .subscribe((districts) => {
        this.districts = districts;
      });
  }
}
