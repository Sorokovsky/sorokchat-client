export {
  ChatsService,
  type GetChatsByMe,
  type ProfileQuery,
  injectGetChatsByMe,
  injectCurrentChat,
  injectProfileQuery
} from "./api";
export {ChatHead} from "./ui";
export {ChatSchema, type Chat, CreateChatSchema, type CreateChat} from "./model";
