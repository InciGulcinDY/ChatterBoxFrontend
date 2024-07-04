import React from 'react'
import { ChatMessageModel } from '../models/ChatMessageModel'
import MessageCard from '../components/MessageCard'

type Props = {
    username: number,
    messageList: ChatMessageModel[],
}

const MessageList = (props: Props) => {
  return (
    <div className='container'>
        <div className="row">MessageList</div>
        {
        (props.messageList.length === 0) ? (
            "You have no message!"
        ):(
            props.messageList.map((message) => (
                (message.sender.id === 1) ? (
                    <div className="row justify-content-end" key={message.id} >
                        <MessageCard message={message} />
                    </div>
                ) : (
                    <div className="row justify-content-start" key={message.id} >
                        <MessageCard message={message} />
                    </div>
                )
                
            ))
        )
        }
    </div>
  )
}

export default MessageList