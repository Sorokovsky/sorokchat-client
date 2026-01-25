import {z as zod} from "zod";

export const BaseScheme = zod.object({
  id: zod.number({message: "Ідентифікатор має бути числом."}),
  createdAt: zod.date({message: "Має бути дата та час створення."}),
  updatedAt: zod.date({message: "Має бути дата та час оновлення."}),
});

export type Base = zod.infer<typeof BaseScheme>;
