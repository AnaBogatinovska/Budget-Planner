import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CategoryData } from 'src/app/models/category/category-data.interface';
import { AppState } from 'src/app/store/app.reducer';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';

@Component({
  selector: 'app-user-category-settings',
  templateUrl: './user-category-settings.component.html',
  styleUrls: ['./user-category-settings.component.scss'],
})
export class UserCategorySettingsComponent implements OnInit {
  public categories: CategoryData[];

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.select('category').subscribe((categoryState) => {
      this.categories = categoryState.userCategories;
    });
  }

  public openCreateCategoryDialog(id: number): void {
    this.dialog.open(CreateCategoryComponent, {
      data: {
        id,
      },
      disableClose: true,
    });
  }

  public openDeleteCategoryDialog(id: number): void {
    this.dialog.open(DeleteCategoryComponent, {
      data: {
        id,
      },
      disableClose: true,
    });
  }
}
