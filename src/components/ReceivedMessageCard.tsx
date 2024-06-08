import React from "react";
import { MessageModel } from "../models/MessageModel";
import { formatDistanceToNow } from "date-fns";
import MessageService from "../services/MessageService";

type Props = {
  message: MessageModel;
  onMessageRead: (messageId: number) => void;
};

const ReceivedMessageCard: React.FC<Props> = ({ message, onMessageRead }) => {
  const formatDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const markMessageAsRead = async () => {
    try {
      await MessageService.markAsRead(message.id);
      onMessageRead(message.id); // Notify parent about the read status
    } catch (error) {
      console.error("Failed to mark message as read", error);
    }
  };

  return (
    <div className="row justify-content-start">
      <div className="card bg-success-subtle border border-1 border-success my-2 text-start px-0 py-0"
        style={{ width: "auto", maxWidth: 400 }}>
        <div className="card-body">
          <p className="card-text fw-normal fs-6 my-0">
            <strong>{message.sender.userName}:</strong> {message.content}
          </p>
          <p className="text-muted fw-lighter text-end my-0">
            <small>{formatDate(message.createdDate!)}</small>
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-success btn-sm" style={{ width: "auto", fontSize: 10 }} onClick={markMessageAsRead}>
              Mark as Read
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivedMessageCard;
