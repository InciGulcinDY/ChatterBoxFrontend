import React, { useState } from "react";
import { IconComponent } from "../utils/Icons";
import { Socket } from "socket.io-client";


type Props = {
  senderId: number;
  recipientId: number;
  room: string;
  socket:Socket | null;
};

const MessageSendingCard: React.FC<Props> = (props: Props) => {

  
  const [content, setContent] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSendMessage = async (e : React.MouseEvent<HTMLButtonElement>) => {
    if (!content.trim()) return;

    e.preventDefault();

    if (content != "" && props.socket != null) {
      props.socket.emit("send_message",{
        content: content,
        room: props.room,
        senderId: props.senderId,
        recipientId:props.recipientId,
        messageType: "CLIENT",
      } );
      console.log("Message sent successfully!");
      const time = "";
      setContent("");
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
            //disabled={recipientId ==  2}
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
