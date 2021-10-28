import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CategoryData } from 'src/app/models/category/category-data.interface';
import { AppState } from 'src/app/store/app.reducer';
import { DeleteCategory } from '../../../../../store/category/category.actions';
import * as fromCategoryActions from '../../../../../store/category/category.actions';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss'],
})
export class DeleteCategoryComponent implements OnInit {
  public category: CategoryData;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private matDialogRef: MatDialogRef<DeleteCategoryComponent>,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('category').subscribe((state) => {
      const result = state.userCategories.filter((c) => c.id === this.data.id);
      if (result.length) {
        this.category = result[0];
      }
    });

    this.actions$
      .pipe(ofType(fromCategoryActions.DELETE_CATEGORY))
      .subscribe(() => {
        this.matDialogRef.close();
      });
  }

  public onDeleteCategory(): void {
    const cnf = confirm(
      'All records will be deleted for this category. Are you sure you want to procceed this action?'
    );
    if (cnf) {
      this.store.dispatch(new DeleteCategory({ id: this.data.id }));
    }
  }
}
