import React from 'react';
import FriendsProfileCard from '../components/FriendsProfileCard';
import { UserModel } from '../models/UserModel';

type Props = {
  friends: UserModel[];
  unreadCounts: { [key: number]: number };
  onSelectCorrespondent: (correspondentId: number) => void;
};

const SidePanel: React.FC<Props> = ({ friends, unreadCounts, onSelectCorrespondent }) => {
  return (
    <div className='mt-2'>
      {friends.length > 0 ? (
        friends.map(friend => (
          <div key={friend.id} onClick={() => onSelectCorrespondent(friend.id)}>
            <FriendsProfileCard friend={friend} unreadCount={unreadCounts[friend.id] || 0} />
          </div>
        ))
      ) : (
        <div>No message</div>
      )}
    </div>
  );
};

export default React.memo(SidePanel);
