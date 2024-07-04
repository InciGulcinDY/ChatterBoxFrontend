import { UserModel } from "./UserModel";

export interface ChatMessageModel {
    id: number,
    content: string,
    sender: UserModel,
    recipient: UserModel,
    createdDate:Date | null,
}