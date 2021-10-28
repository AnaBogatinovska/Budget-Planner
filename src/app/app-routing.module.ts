import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DrawerComponent } from './components/drawer/drawer.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then(
        (module) => module.WelcomeModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'plan',
    component: DrawerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'month/:year/:month',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/month-plan/month-plan.module').then(
            (module) => module.MonthPlanModule
          ),
      },
      {
        path: 'year/:year',
        loadChildren: () =>
          import('./pages/year-plan/year-plan.module').then(
            (module) => module.YearPlanModule
          ),
      },
    ],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/page-not-found/page-not-found.module').then(
        (module) => module.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
