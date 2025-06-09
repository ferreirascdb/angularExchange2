import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {provideAuth,getAuth} from '@angular/fire/auth';
import {auth} from '../auth/auth'

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    importProvidersFrom(HttpClientModule),
    provideFirebaseApp(()=>initializeApp(auth.firebase)),
    provideAuth(()=>getAuth())]
};
