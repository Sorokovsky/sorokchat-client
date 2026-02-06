import {z as zod} from "zod";

export const BaseSchema = zod.object({
  id: zod.number({message: "Ідентифікатор має бути числом."}),
  createdAt: zod.coerce.date({message: "Має бути дата та час створення."}),
  updatedAt: zod.coerce.date({message: "Має бути дата та час оновлення."}),
});
