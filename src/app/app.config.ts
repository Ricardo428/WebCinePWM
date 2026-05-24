import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { provideIonicAngular } from '@ionic/angular/standalone';

import { APP_INITIALIZER } from '@angular/core';
import { DatabaseService } from './services/database.service';

const app = initializeApp(environment.firebase)

export function initDB(db: DatabaseService) {
  return () => db.initDb();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideIonicAngular({ mode: 'md' }),
    provideFirebaseApp(() => app),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    {
      provide: APP_INITIALIZER,
      useFactory: initDB,
      deps: [DatabaseService],
      multi: true
    }
  ]
};
