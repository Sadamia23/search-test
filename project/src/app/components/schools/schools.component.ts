import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.scss',
})
export class SchoolsComponent implements OnInit {
  constructor(private _resultService: ResultService) {}
  ngOnInit(): void {
    let totalItems = this._resultService.schoolsResult.totalItems;
    let pages = Math.ceil(totalItems / 24);
    console.log(pages);
    console.log(this._resultService.id);

    this.showSchools(pages);
  }

  showSchools(pages: number) {
    for (let i = 1; i <= pages; i++) {
      this._resultService
        .getResultsFromAPI(this._resultService.id, i)
        .subscribe((data) => {
          console.log(data);
        });
    }
  }

  showMore(i: number) {
    return i + 1;
  }
}
