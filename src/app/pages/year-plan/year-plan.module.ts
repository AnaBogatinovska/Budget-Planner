import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YearPlanRoutingModule } from './year-plan-routing.module';
import { YearPlanComponent } from './year-plan.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    YearPlanComponent
  ],
  imports: [
    CommonModule,
    YearPlanRoutingModule,
    MaterialModule
  ]
})
export class YearPlanModule { }
