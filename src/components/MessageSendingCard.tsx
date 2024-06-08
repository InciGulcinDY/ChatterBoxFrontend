import React, { useState } from "react";
import { IconComponent } from "../utils/Icons";
import MessageService from "../services/MessageService";
import { AddMessageModel } from "../models/AddMessageModel";

type Props = {
  senderId: number;
  recipientId: number;
};

const MessageSendingCard: React.FC<Props> = ({senderId, recipientId}) => {
  const [content, setContent] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const newMessage: AddMessageModel = {
        content: content,
        senderId: senderId,
        recipientId: recipientId,
      };
      await MessageService.add(newMessage);
      // Clear the input field after sending the message
      setContent("");
      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-11">
          <input
            type="text"
            name="message"
            className="form-control border border-2 border-warning rounded bg-body-tertiary"
            style={{ height: 100 }}
            placeholder="Type your message here..."
            maxLength={300} 
            value={content}
            onChange={handleChange}
          />

          <small className="text-muted">
            {300 - content.length} characters remaining
          </small>
        </div>

        <div className="col-1">
          <button type="button" className="btn btn-success" onClick={handleSendMessage}>
            <IconComponent iconName="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageSendingCard;
