import { InjectionToken } from '@angular/core';

import type { StorageService } from '../utils';

export const STORAGE_SERVICE = new InjectionToken<StorageService>('STORAGE_SERVICE');
