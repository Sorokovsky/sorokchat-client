import type { InferOutput } from 'valibot';
import { object, string } from 'valibot';

export const AuthorizedSchema = object({
  accessToken: string(),
});
export type AuthorizedPayload = InferOutput<typeof AuthorizedSchema>;
