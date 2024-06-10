import React from "react";
import { MessageModel } from "../models/MessageModel";
import { SentMessageModel } from "../models/SentMessageModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/configureStore";

type Props = {
  message: SentMessageModel;
};

// TO DO: User!!!

const NewMessageCard: React.FC<Props> = ({ message }) => {
  return (
    <div className="row justify-content-end">
      <div
        className="card bg-primary-subtle border border-1 border-primary my-2 text-end "
        style={{ width: "auto", maxWidth: 400 }}
      >
        <div className="card-body">
          <h6 className="card-title">İnci</h6>
          <p className="card-text fw-normal">
            {message.content}
            <br />
            <small className="text-muted fw-lighter">Now</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewMessageCard;
