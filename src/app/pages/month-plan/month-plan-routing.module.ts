import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthPlanComponent } from './month-plan.component';

const routes: Routes = [
  {
    path: '',
    component: MonthPlanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthPlanRoutingModule {}
