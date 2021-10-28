import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { DrawerComponent } from './components/drawer/drawer.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './store/category/category.effects';
import { AuthEffects } from './store/auth/auth.effects';
import { MonthPlanEffects } from './store/month-plan/month-plan.effects';
import { YearPlanEffects } from './store/year-plan/year-plan.effects';

@NgModule({
  declarations: [AppComponent, DrawerComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([
      AuthEffects,
      MonthPlanEffects,
      YearPlanEffects,
      CategoryEffects,
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
