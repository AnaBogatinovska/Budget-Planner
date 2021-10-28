import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Subject, BehaviorSubject } from 'rxjs';
import { MonthlyData } from '../../models/month/monthly-data.interface';

@Injectable({ providedIn: 'root' })
export class Utility {
  public totalBalance = new BehaviorSubject<number>(0);
  public refreshCurrentMonthBalance = new Subject<number>();

  public amountCost(cost: number): string {
    return cost < 0 ? `-$${cost - cost - cost}` : `$${cost}`;
  }

  public monthName(n: number): string {
    return moment.months(n);
  }

  public calculateBalance(data: MonthlyData): number {
    if (data.expenses.length > 0) {
      return (
        data.budget -
        data.expenses
          .map((item) => item.amount)
          .reduce((acc, item) => {
            return acc + item;
          })
      );
    } else {
      return data.budget;
    }
  }

  public isCurrentMonth(year: number, month: number): boolean {
    return (
      year === new Date().getFullYear() && month === new Date().getMonth() + 1
    );
  }
}
