import type {Chat, NewChat} from "@/entities";
import type {BaseMutation} from "@/shared";

export type CreateChat = BaseMutation<Chat, NewChat>;