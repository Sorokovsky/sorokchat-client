import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from '@/app/config';
import {Root} from './root/root';

bootstrapApplication(Root, appConfig)
  .catch((err: Error): void => console.error(err));
