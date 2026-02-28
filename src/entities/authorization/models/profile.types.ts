import type { BaseQuery } from '@/shared';

import type { UserPayload } from '../../user/models/user.schema';

export type Profile = BaseQuery<UserPayload>;
