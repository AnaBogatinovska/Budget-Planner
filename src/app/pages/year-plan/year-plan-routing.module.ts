import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YearPlanComponent } from './year-plan.component';

const routes: Routes = [
  {
    path: '',
    component: YearPlanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YearPlanRoutingModule {}
