import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { YearDataResponse } from 'src/app/models/year/year-data-response.interface';
import { Utility } from 'src/app/services/utilities/utilities';
import { AppState } from 'src/app/store/app.reducer';
import { GetYearData } from '../../store/year-plan/year-plan.actions';

@Component({
  selector: 'app-year-plan',
  templateUrl: './year-plan.component.html',
  styleUrls: ['./year-plan.component.scss'],
})
export class YearPlanComponent implements OnInit {
  public year: number = new Date().getFullYear();
  public selectedYear: number = new Date().getFullYear();
  public yearData: YearDataResponse;
  public yearData$: Observable<YearDataResponse>;
  public isYearPickerOpen: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private utilities: Utility
  ) {}

  ngOnInit(): void {
    this.isYearPickerOpen = false;

    this.route.params.subscribe((params) => {
      if (this.selectedYear !== +params.year) {
        this.selectedYear = +params.year;
      }
      this.getYearData(this.selectedYear);
    });

    this.yearData$ = this.store
      .select('year')
      .pipe(map((yearState) => yearState.yearData));
  }

  private getYearData(year: number): void {
    this.store.dispatch(new GetYearData({ year }));
  }

  public routeNagivateToUrl(year: number): void {
    this.router.navigate(['plan/year', year]);
  }

  public onYearSelected(y: number): void {
    this.selectedYear = y;
    this.routeNagivateToUrl(this.selectedYear);
    this.isYearPickerOpen = !this.isYearPickerOpen;
  }

  public minusYear(): void {
    this.selectedYear--;
    this.routeNagivateToUrl(this.selectedYear);
  }

  public plusYear(): void {
    this.selectedYear++;
    this.routeNagivateToUrl(this.selectedYear);
  }

  public yearOpts(): number[] {
    const result = [];

    for (let i = this.year - 25; i <= this.year; i++) {
      result.push(i);
    }

    return result;
  }
}
