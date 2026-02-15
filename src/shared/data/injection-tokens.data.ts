import { InjectionToken } from '@angular/core';

import type { EncryptionService, SigningService } from '../util';

export const ENCRYPTION_SERVICE = new InjectionToken<EncryptionService>('ENCRYPTION_SERVICE');
export const SIGNING_SERVICE = new InjectionToken<SigningService>('SIGNING_SERVICE');
