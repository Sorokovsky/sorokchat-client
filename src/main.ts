import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './configs/app.config';
import {Root} from '@/components/root/root';

bootstrapApplication(Root, appConfig)
  .catch((err: Error): void => console.error(err));
