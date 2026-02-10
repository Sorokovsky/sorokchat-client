import { z as zod } from 'zod';

export const BaseSchema = zod.object({
  id: zod.number({ message: 'Ідентифікатор має бути числом' }),
  createdAt: zod.coerce.date({ message: 'Дата створення має бути' }),
  updatedAt: zod.coerce.date({ message: 'Дата оновлення має бути' }),
});
