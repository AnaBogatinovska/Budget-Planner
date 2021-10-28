import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CategoryData } from 'src/app/models/category/category-data.interface';
import { CategoryDataResponse } from 'src/app/models/category/category-response-data.interface';
import { Expense } from 'src/app/models/expense/expense.interface';
import { Utility } from 'src/app/services/utilities/utilities';
import { AppState } from 'src/app/store/app.reducer';
import { GetCategories } from '../../../../../store/category/category.actions';
import { CreateExpenseComponent } from '../create-expense/create-expense.component';
import { DeleteExpenseComponent } from '../delete-expense/delete-expense.component';

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrls: ['./list-expense.component.scss'],
})
export class ListExpenseComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<Expense>;
  @ViewChild(MatSort) sort: MatSort;
  @Input() month: number;
  @Input() year: number;
  @Input() expenses: Expense[];
  public budget: number;
  public categories: CategoryData[];
  public categories$: Observable<CategoryDataResponse>;
  public expenses$: Observable<Expense[]>;
  public displayedColumns: string[] = [
    'position',
    'name',
    'category',
    'cost',
    'payment date',
    'actions',
  ];
  public dataSource: MatTableDataSource<Expense>;

  constructor(
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private utilities: Utility
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.expenses);

    this.store.dispatch(new GetCategories());
    this.openDialogFromFragment();
    this.expensesSelector();
    this.categorySelector();

    this.store.select('month').subscribe((state) => {
      this.budget = state.monthlyData.budget;
    });
  }

  private expensesSelector(): void {
    this.expenses$ = this.store.select('month').pipe(
      map((monthState) => monthState.monthlyData.expenses),
      tap((expenses) => {
        this.dataSource.data = expenses;
      })
    );
  }
  private categorySelector(): void {
    this.categories$ = this.store.select('category').pipe(
      map((categoryState) => {
        return {
          categories: categoryState.categories,
          user: categoryState.userCategories,
        };
      }),
      tap((state) => {
        this.categories = state.categories.concat(state.user);
      })
    );
  }

  public openDialogFromFragment(): void {
    const fragment = this.route.snapshot.fragment || '';

    if (fragment.includes('edit-expense')) {
      const expenseId = this.route.snapshot.fragment.replace(
        'edit-expense-',
        ''
      );
      const expense = this.expenses.find((e) => e.id === +expenseId);

      this.openAddOrEditExpenseDialog('edit', expense);
    } else if (fragment.includes('delete-expense')) {
      const expenseId = this.route.snapshot.fragment.replace(
        'delete-expense-',
        ''
      );
      const expense = this.expenses.find((e) => e.id === +expenseId);
      this.openDeleteExpenseDialog(expense);
    } else if (fragment.includes('create-expense')) {
      this.openAddOrEditExpenseDialog('create');
    }
  }

  public categoryName(id: number): string {
    return this.categories.length
      ? this.categories.filter((c) => c.id === id)[0].name
      : '';
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openAddOrEditExpenseDialog(
    mode: string,
    expense: Expense = null
  ): void {
    this.dialog
      .open(CreateExpenseComponent, {
        minWidth: '300px',
        data: { mode, expense, year: this.year, month: this.month },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => {
        this.location.back();
      });
  }

  public openDeleteExpenseDialog(element: Expense): void {
    this.dialog
      .open(DeleteExpenseComponent, {
        minWidth: '300px',
        data: {
          expense: element,
          year: this.year,
          month: this.month,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => {
        this.location.replaceState(`plan/month/${this.year}/${this.month}`);
        this.location.back();
      });
  }
}
