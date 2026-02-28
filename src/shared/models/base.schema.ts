import { date, number, object } from 'valibot';

export const BaseSchema = object({
  id: number(),
  createdAt: date(),
  updatedAt: date(),
});
