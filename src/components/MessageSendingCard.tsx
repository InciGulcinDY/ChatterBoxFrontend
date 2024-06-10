import React, { useState } from "react";
import { IconComponent } from "../utils/Icons";
import MessageService from "../services/MessageService";
import { useDispatch } from "react-redux";
import { setSentMessage } from "../store/messagesSlice";
import { SentMessageModel } from "../models/SentMessageModel";

type Props = {
  senderId: number;
  recipientId: number | null;
};

const MessageSendingCard: React.FC<Props> = ({ senderId, recipientId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!content.trim()) return;

    setLoading(true); // Set loading to true
    try {
      const newMessage: SentMessageModel = {
        
        content: content,
        senderId: senderId,
        recipientId: recipientId,
      };
      await MessageService.add(newMessage);
      dispatch(setSentMessage(newMessage)); // Dispatch the new message directly
      // Clear the input field after sending the message
      setContent("");
      // Show the success alert
      setShowSuccess(true);
      // Hide the success alert after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="container mt-2">
      <div className="row">
        {showSuccess && (
          <div className="alert alert-success d-flex align-items-center mt-0" role="alert" style={{height:50}}>
            <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Success:">
              <use xlinkHref="#check-circle-fill" />
            </svg>
            <div>
              Your message sent successfully!
            </div>
          </div>
        )}
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
            disabled={recipientId == null || loading}
          />
          <small className="text-muted">
            {300 - content.length} characters remaining
          </small>
        </div>
        <div className="col-1">
          <button type="button" className="btn btn-success" onClick={handleSendMessage} disabled={!content.trim() || loading}>
            {loading ? "Sending..." : <IconComponent iconName="Send" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageSendingCard;
