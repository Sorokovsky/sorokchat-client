import { InjectionToken } from '@angular/core';

import type { StorageService } from '../api';
import type { EncryptionService, SigningService } from '../lib';

export const ENCRYPTION_SERVICE = new InjectionToken<EncryptionService>('ENCRYPTION_SERVICE');
export const SIGNING_SERVICE = new InjectionToken<SigningService>('SIGNING_SERVICE');
export const STORAGE_SERVICE = new InjectionToken<StorageService>('STORAGE_SERVICE');
