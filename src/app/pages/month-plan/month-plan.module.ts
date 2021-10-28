import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthPlanRoutingModule } from './month-plan-routing.module';
import { MonthPlanComponent } from './month-plan.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUpdateUserMonthPlanComponent } from './components/create-update-user-month-plan/create-update-user-month-plan.component';
import { ListExpenseComponent } from './components/expense/list-expense/list-expense.component';
import { DeleteExpenseComponent } from './components/expense/delete-expense/delete-expense.component';
import { CreateExpenseComponent } from './components/expense/create-expense/create-expense.component';
import { CreateCategoryComponent } from './components/category/create-category/create-category.component';
import { UserCategorySettingsComponent } from './components/category/user-category-settings/user-category-settings.component';
import { DeleteCategoryComponent } from './components/category/delete-category/delete-category.component';

@NgModule({
  declarations: [
    MonthPlanComponent,
    CreateUpdateUserMonthPlanComponent,
    ListExpenseComponent,
    DeleteExpenseComponent,
    CreateExpenseComponent,
    CreateCategoryComponent,
    UserCategorySettingsComponent,
    DeleteCategoryComponent,
  ],
  imports: [
    CommonModule,
    MonthPlanRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class MonthPlanModule {}
