import { findIndex } from 'rxjs/operators';
import { CategoryState } from 'src/app/models/state/category-state.interface';
import * as CategoryActions from './category.actions';
export const initialState: CategoryState = {
  categories: [],
  userCategories: [],
};

export function categoryReducer(
  state: CategoryState = initialState,
  action: CategoryActions.CategoryActions
): CategoryState {
  switch (action.type) {
    case CategoryActions.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: [...action.payload.categories],
        userCategories: action.payload.user.length
          ? [...action.payload.user]
          : [],
      };

    case CategoryActions.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        userCategories: state.userCategories.length ? [...state.userCategories, action.payload] : [action.payload] ,
      };

    case CategoryActions.UPDATE_CATEGORY_SUCCESS:
      const copyCategoriesArray = state.userCategories.slice();
      const idx = copyCategoriesArray.findIndex(
        (c) => c.id === action.payload.id
      );
      copyCategoriesArray[idx] = { ...action.payload };
      return {
        ...state,
        userCategories: copyCategoriesArray,
      };

    case CategoryActions.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        userCategories: state.userCategories.filter(
          (c) => c.id !== action.payload.id
        ),
      };
    case CategoryActions.GET_CATEGORIES_FAIL:
      return {
        ...state,
        categories: [],
        userCategories: [],
      };
    default:
      return state;
  }
}
