import React from 'react'
import { ChatMessageModel } from '../models/ChatMessageModel'
import { formatDate, formatDistanceToNow } from 'date-fns'

type Props = {
    message:ChatMessageModel,
}
//<div>MessageCard : {props.message.content}</div>
const MessageCard = (props: Props) => {

    const formatDate = (date: Date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
      };


  return (
    <div className="row">
      <div className="card bg-success-subtle border border-1 my-2 text-start px-0 py-0" style={{ width: "auto", maxWidth: 400 }}>
        <div className="card-body">
          <p className="card-text fw-normal fs-6 my-0">
            {props.message.content}
          </p>
          <p className="text-muted fw-lighter text-end my-0">
            <small>{formatDate(props.message.createdDate!)}</small>
          </p>
        </div>
      </div>
    </div>
  )
}

export default MessageCard