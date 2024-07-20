import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import { Server } from "http";
import MessageRoom from '../layouts/MessageRoom';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setReferringPage } from '../store/referringPageSlice';
import SidePanel from '../layouts/SidePanel';
import store, { RootState } from '../store/configureStore';
import MessageService from '../services/MessageService';
import { RoomModel } from '../models/RoomModel';

type Props = {

}


const MyChatPage = (props: Props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roomState = useSelector((state:RootState) => state.room.room);

  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>("beyzainci"); // TO DO: DEĞİŞTİR
  const params = useParams<{room:string}>();
  const userId = 1; // TO DO: DEĞİŞTİR
  const [recipientId, setRecipientId] = useState<number>(2);
  

  //  Fetching Message Rooms in accordance with the UserId when the page load
  useEffect(() => {
    const fetchedRooms = async () => {
      try {
        const fetchedRooms = await MessageService.getAllRooms(userId);
        setRooms(fetchedRooms);
        console.log("Fetched Rooms: ", fetchedRooms);
      } catch (error) {       
        console.error("Failed to fetch Message Rooms: ", error);
      }
    };
    fetchedRooms();
    return () => {     
    }
  }, []);
  

  //  Managing Message Room 
  useEffect(() => {
    setSelectedRoom(roomState);
  }, [roomState]);
  

/*
  useEffect(() => {
    if (params.room) {
      dispatch(setReferringPage(`//api/chat/${params.room}`));
      setRoom(params.room);
    }
  }, [params.room, dispatch]);*/


  

  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-3 bg-light">
          <SidePanel  rooms={rooms} />
        </div>
        <div className="col-9">
          {
            (selectedRoom==='') ? (
              "Mesajınız yok"
            ):(
              <MessageRoom userId={userId} room={selectedRoom} recipientId={recipientId} />
            )
          }
          
        </div>

      </div>

        
        
        
    </div>
  )
}

export default MyChatPage