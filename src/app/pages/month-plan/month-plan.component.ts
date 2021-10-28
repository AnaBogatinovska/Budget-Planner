import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import { MonthlyData } from 'src/app/models/month/monthly-data.interface';
import { Utility } from 'src/app/services/utilities/utilities';
import { CreateUpdateUserMonthPlanComponent } from './components/create-update-user-month-plan/create-update-user-month-plan.component';
import { AppState } from 'src/app/store/app.reducer';
import * as fromMonth from '../../store/month-plan/month-plan.actions';
import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-month-plan',
  templateUrl: './month-plan.component.html',
  styleUrls: ['./month-plan.component.scss'],
})
@HostListener('window:resize', ['$event'])
export class MonthPlanComponent implements OnInit {
  public month: number;
  public year: number;
  public monthlyData: MonthlyData;
  public monthlyBalance = 0;
  public monthData$: Observable<MonthlyData>;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public utilities: Utility,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (this.month !== +params.month || this.year !== +params.year) {
        this.getMonthData(+params.year, +params.month);
      }
      this.month = +params.month || new Date().getMonth() + 1;
      this.year = +params.year || new Date().getFullYear();
    });

    if (!this.monthlyData) {
      this.getMonthData(this.year, this.month);
    }

    this.monthlyDataSelector();
  }

  private getMonthData(year: number, month: number): void {
    this.store.dispatch(new fromMonth.GetMonthData({ year, month }));
  }

  private monthlyDataSelector(): void {
    this.monthData$ = this.store.select('month').pipe(
      map((value) => {
        return value.monthlyData;
      }),
      tap((monthData) => {
        if (monthData) {
          this.monthlyBalance = this.utilities.calculateBalance(monthData);
          if (+this.month === new Date().getMonth() + 1) {
            this.utilities.refreshCurrentMonthBalance.next(this.monthlyBalance);
          }
          this.monthlyData = { ...monthData };
        }
      })
    );
  }

  public openUserMonthPlanDialog(mode: string): void {
    this.dialog.open(CreateUpdateUserMonthPlanComponent, {
      data: {
        income: this.monthlyData.income,
        budget: this.monthlyData.budget,
        mode,
        year: this.year,
        month: this.month,
      },
      disableClose: true,
    });
  }

  public monthName(): string {
    const monthName: string = moment()
      .month(this.month - 1)
      .format('MMMM');
    return monthName;
  }
}
