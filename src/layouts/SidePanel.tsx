import React from 'react';
import FriendsProfileCard from '../components/FriendsProfileCard';
import { UserModel } from '../models/UserModel';

type Props = {
  friends: UserModel[];
  unreadCounts: { [key: number]: number };
  onSelectedFriend: (selectedFriendId: number) => void;
};
//  Not: it may be used with the new design, delete later!
const SidePanel: React.FC<Props> = ({ friends, unreadCounts, onSelectedFriend }) => {
  return (
    <div className='mt-2'>
      {friends.length > 0 ? (
        friends.map(friend => (
          <div key={friend.id} onClick={() => onSelectedFriend(friend.id)}>
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
