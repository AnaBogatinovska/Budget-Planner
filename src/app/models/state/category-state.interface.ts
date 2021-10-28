import { CategoryData } from '../category/category-data.interface';

export interface CategoryState {
  categories: CategoryData[];
  userCategories: CategoryData[];
}
