import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { ISchool } from '../../interfaces/school.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.scss',
})
export class SchoolsComponent implements OnInit {
  data: ISchool[] = [];
  currentElements: ISchool[] = [];
  filteredElementsByDistricts: ISchool[] = [];
  showMore: boolean = true;
  totalSchools: number = 0;
  isLoading: boolean = false;
  constructor(private _resultService: ResultService) {}
  ngOnInit(): void {
    this.filterElements();
  }

  async loadAllSchoolsInRegion(pages: number): Promise<void> {
    const promises = [];

    for (let i = 1; i <= pages; i++) {
      const promise = firstValueFrom(
        this._resultService.getResultsFromAPI(this._resultService.id, i)
      )
        .then((data) => {
          if (data && data.result) {
            this.data = this.data.concat(data.result);
          }
        })
        .catch((error) => {
          console.error(`Error loading page ${i}:`, error);
        });
      promises.push(promise);
    }

    await Promise.all(promises);
  }

  async filterElements() {
    try {
      this.isLoading = true;
      let totalItems = this._resultService.schoolsResult.totalItems;
      let pages = Math.ceil(totalItems / 24);

      await this.loadAllSchoolsInRegion(pages);

      if (this._resultService.showOnlyPublic) {
        this.filteredElementsByDistricts = this.data.filter(
          (item) =>
            this._resultService.selectedDistricts.includes(item.districtName) &&
            item.schoolType === 'PUBLIC'
        );
      } else {
        this.filteredElementsByDistricts = this.data.filter((item) =>
          this._resultService.selectedDistricts.includes(item.districtName)
        );
      }

      this.totalSchools = this.filteredElementsByDistricts.length;

      this.currentElements = this.currentElements.concat(
        this.filteredElementsByDistricts.slice(0, 24)
      );
      this.isLoading = false;
    } catch (error) {
      console.error('Error Loading elements', error);
    }
  }
  loadMore() {
    const nextSlice = this.filteredElementsByDistricts.slice(
      this.currentElements.length,
      this.currentElements.length + 24
    );

    this.currentElements.push(...nextSlice);

    this.showMore =
      this.currentElements.length < this.filteredElementsByDistricts.length;
  }
}
