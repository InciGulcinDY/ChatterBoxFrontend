import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import { Server } from "http";
import MessageRoom from '../layouts/MessageRoom';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { setReferringPage } from '../store/referringPageSlice';







type Props = {

}


const MyChatPage = (props: Props) => {

  const [room, setRoom] = useState<string>("beyzainci"); // TO DO: DEĞİŞTİR
  const params = useParams<{room:string}>();
  const userId = 1; // TO DO: DEĞİŞTİR
  const recipientId= 2; // TO DO: DEĞİŞTİR

  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(setReferringPage(`//api/chat/${params.room}`));

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