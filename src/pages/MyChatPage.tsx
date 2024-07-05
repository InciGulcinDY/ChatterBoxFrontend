import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import { Server } from "http";
import MessageRoom from '../layouts/MessageRoom';







type Props = {

}


const MyChatPage = (props: Props) => {

  const [room, setRoom] = useState("beyzainci"); // TO DO: DEĞİŞTİR
  const userId = 1; // TO DO: DEĞİŞTİR
  const recipientId= 2; // TO DO: DEĞİŞTİR
  

  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-3 bg-light">
          Room bilgileri gelecek
        </div>
        <div className="col-9">
          {
            (room==='') ? (
              "Mesajınız yok"
            ):(
              <MessageRoom userId={userId} room={room} recipientId={recipientId} />
            )
          }
          
        </div>

      </div>

        
        
        
    </div>
  )
}

export default MyChatPage