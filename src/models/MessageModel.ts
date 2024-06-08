import { UserModel } from "./UserModel";

export interface MessageModel {
	id: number;
	content: string;
	sender: UserModel;
    recipient: UserModel;
    read: boolean;
    createdDate: Date | null;
    
}