import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CategoryData } from 'src/app/models/category/category-data.interface';
import { AppState } from 'src/app/store/app.reducer';
import {
  CreateCategory,
  UpdateCategory,
} from '../../../../../store/category/category.actions';
import * as fromCategoryActions from '../../../../../store/category/category.actions';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  public categoryForm: FormGroup;
  public customCategory: CategoryData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private store: Store<AppState>,
    private matDialogRef: MatDialogRef<CreateCategoryComponent>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      if (this.data.id) {
        this.customCategory = state.category.userCategories.filter(
          (c) => c.id === this.data.id
        )[0];
      }
    });

    this.categoryForm = new FormGroup({
      name: new FormControl(
        this.customCategory ? this.customCategory.name : null,
        Validators.required
      ),
      description: new FormControl(
        this.customCategory ? this.customCategory.description : null
      ),
    });

    this.actions$
      .pipe(
        ofType(
          fromCategoryActions.CREATE_CATEGORY,
          fromCategoryActions.UPDATE_CATEGORY
        )
      )
      .subscribe(() => {
        this.matDialogRef.close();
      });
  }

  public onAddCategory(): void {
    if (this.data.id) {
      this.store.dispatch(
        new UpdateCategory({ id: this.data.id, ...this.categoryForm.value })
      );
    } else {
      this.store.dispatch(new CreateCategory(this.categoryForm.value));
    }
  }
}
