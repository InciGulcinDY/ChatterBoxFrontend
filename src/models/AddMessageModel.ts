
export interface AddMessageModel {

    content: string;
    room: string;
	senderId: number;
    recipientId: number | null;
    messageType: string;

}