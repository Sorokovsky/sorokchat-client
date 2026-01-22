import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './configs/app.config';
import {MainLayout} from '@/components/layout/main-layout/main-layout';

bootstrapApplication(MainLayout, appConfig)
  .catch((err) => console.error(err));
