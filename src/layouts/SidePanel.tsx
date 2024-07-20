import React from 'react';
import FriendsProfileCard from '../components/FriendsProfileCard';
import { RoomModel } from '../models/RoomModel';
import { Link } from 'react-router-dom';

type Props = {
  rooms: RoomModel[],
};

const SidePanel: React.FC<Props> = ({ rooms }) => {
  return (
    <div className='mt-2'>
      {
        rooms.length > 0 ? (
          rooms.map(room => (
            <FriendsProfileCard key={room.userId} room={room} />
          ))
        ) : (
          <div className="card mt-3">
            <div className="card-body">
              You have not enrolled any message room! <Link to={"/api/newmessageroom"} >Start here!</Link>
            </div>
          </div>          
        )
      }
    </div>
  );
};

export default React.memo(SidePanel);
