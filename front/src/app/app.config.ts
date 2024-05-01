import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  provideCharts,
  withDefaultRegisterables
} from 'ng2-charts';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    importProvidersFrom(
      HttpClientModule
    ),
    provideHttpClient(withFetch(), withInterceptors([SpinnerInterceptor])),
    provideCharts(withDefaultRegisterables())
  ]
};
