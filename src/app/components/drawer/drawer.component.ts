import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MonthlyData } from 'src/app/models/month/monthly-data.interface';
import { GetCurrentMonthData } from 'src/app/store/month-plan/month-plan.actions';
import { Logout } from 'src/app/store/auth/auth.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Utility } from 'src/app/services/utilities/utilities';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
@HostListener('window:resize', ['$event'])
export class DrawerComponent implements OnInit {
  public isDrawerOpen: boolean;
  public panelOpenState: boolean;
  public innerWidth: number;
  public user: { name: string };
  public monthlyBalance = 0;
  public isActiveMonthRoute: boolean;
  public isActiveYearRoute: boolean;
  public monthBalance$: Observable<MonthlyData>;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public utilities: Utility,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.isDrawerOpen = true;
    this.panelOpenState = false;
    this.innerWidth = window.innerWidth;
    this.user = this.authService.getUserData();

    this.store.dispatch(
      new GetCurrentMonthData({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      })
    );

    this.route.url.subscribe((route) => {
      this.isActiveMonthRoute = this.router.url.includes('month');
      this.isActiveYearRoute = this.router.url.includes('year');
    });

    this.getCurrentMonthlyBalance();
  }
  public getCurrentMonthlyBalance(): void {
    this.monthBalance$ = this.store.select('month').pipe(
      map((monthState) => {
        return monthState.currentMonthlyData;
      }),
      tap((currentMonthData) => {
        if (currentMonthData) {
          this.monthlyBalance =
            this.utilities.calculateBalance(currentMonthData);
        }
      })
    );
  }

  get year(): string {
    return JSON.stringify(new Date().getFullYear());
  }
  get month(): string {
    return JSON.stringify(new Date().getMonth() + 1);
  }

  public onResize(event): void {
    this.innerWidth = event.target.innerWidth;
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }
}
