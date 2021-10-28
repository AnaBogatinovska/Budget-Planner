import { Action } from '@ngrx/store';
import { CategoryData } from 'src/app/models/category/category-data.interface';
import { CategoryDataResponse } from 'src/app/models/category/category-response-data.interface';

export const GET_CATEGORIES = '[Category] GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = '[Category] GET_CATEGORIES_SUCCESS';
export const CREATE_CATEGORY = '[Category] CREATE_CATEGORY';
export const CREATE_CATEGORY_SUCCESS =
  '[Category]UPDATECREATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY = '[Category] UPDATE_CATEGORY';
export const UPDATE_CATEGORY_SUCCESS = '[Category] UPDATE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY = '[Category] DELETE_CATEGORY';
export const DELETE_CATEGORY_SUCCESS = '[Category] DELETE_CATEGORY_SUCCESS';
export const GET_CATEGORIES_FAIL = '[Category] GET_CATEGORIES_FAIL';

// get
export class GetCategories implements Action {
  readonly type = GET_CATEGORIES;
}

export class GetCategoriesSuccess implements Action {
  readonly type = GET_CATEGORIES_SUCCESS;
  constructor(public payload: CategoryDataResponse) {}
}

// create
export class CreateCategory implements Action {
  readonly type = CREATE_CATEGORY;
  constructor(
    public payload: {
      name: string;
      description: string;
    }
  ) {}
}

export class CreateCategorySuccess implements Action {
  readonly type = CREATE_CATEGORY_SUCCESS;
  constructor(public payload: CategoryData) {}
}

// update
export class UpdateCategory implements Action {
  readonly type = UPDATE_CATEGORY;
  constructor(public payload: CategoryData) {}
}

export class UpdateCategorySuccess implements Action {
  readonly type = UPDATE_CATEGORY_SUCCESS;
  constructor(public payload: CategoryData) {}
}

// delete
export class DeleteCategory implements Action {
  readonly type = DELETE_CATEGORY;
  constructor(public payload: { id: number }) {}
}

export class DeleteCategorySuccess implements Action {
  readonly type = DELETE_CATEGORY_SUCCESS;
  constructor(public payload: { id: number }) {}
}

// error
export class GetCategoriesFail implements Action {
  readonly type = GET_CATEGORIES_FAIL;
  constructor(public payload: string) {}
}

export type CategoryActions =
  | GetCategories
  | GetCategoriesSuccess
  | CreateCategory
  | CreateCategorySuccess
  | UpdateCategory
  | UpdateCategorySuccess
  | DeleteCategory
  | DeleteCategorySuccess
  | GetCategoriesFail;
