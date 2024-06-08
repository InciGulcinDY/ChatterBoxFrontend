import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageSendingCard from '../components/MessageSendingCard';
import Messages from '../layouts/Messages/Messages';
import SidePanel from '../layouts/SidePanel';
import { MessageModel } from '../models/MessageModel';
import MessageService from '../services/MessageService';
import { RootState } from '../store/configureStore';
import './MyMessagesPage.css';
import { setMessages, markMessageAsRead as markMessageAsReadAction } from '../store/messagesSlice';
import { UserModel } from '../models/UserModel';


const POLLING_INTERVAL = 10000; // Poll every 10 seconds

const MyMessagesPage = () => {
  // Unread Messages
  const [unreadMessages, setUnreadMessagesState] = useState<MessageModel[]>([]);
  // Archived Messages
  const [archivedMessages, setArchivedMessages] = useState<MessageModel[]>([]);
  const [showArchived, setShowArchived] = useState<boolean>(false);
  // Friends
  const [friends, setFriends] = useState<UserModel[]>([]);
  const friendId = useSelector((state: RootState) => state.friend.friend?.id) || 1;
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<{ [key: number]: number }>({});

  // State variables to manage loading state and error handling.
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Current User
  const dispatch = useDispatch();
  const currentUserId = 1;
  
  // Fetching friends of user for Side Panel
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const fetchAllFriends = await MessageService.getAllFriends(currentUserId);
        const fetchedUnreadCounts = await MessageService.getUnreadMessageCounts(currentUserId);
        setFriends(fetchAllFriends);
        setUnreadCounts(fetchedUnreadCounts);
      } catch (err) {
        setError('Failed to fetch friends');
        console.error('Error fetching friends:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();

    //  Frontend checks for new messages at specified intervals
    const intervalId = setInterval(fetchFriends, POLLING_INTERVAL);
    //  Clear interval on component unmount
    return () => clearInterval(intervalId); 

  }, [currentUserId]);

  // Fetching Messages
  useEffect(() => {
    if (selectedFriend === null) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const fetchedUnreadMessages = await MessageService.getUnreadMessages(currentUserId, selectedFriend);
        setUnreadMessagesState(fetchedUnreadMessages);
        dispatch(setMessages(fetchedUnreadMessages));
      } catch (err) {
        setError('Failed to fetch messages');
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  
    //  Frontend checks for new messages at specified intervals
    const intervalId = setInterval(fetchMessages, POLLING_INTERVAL);
    // Clear interval on component unmount
    return () => clearInterval(intervalId); 
  }, [selectedFriend, currentUserId, dispatch]);

  //  Handling Functions for Selection of Friends
  const handleFriendSelect = useCallback((selectedFriendId: number) => {
    setShowArchived(false);
    setSelectedFriend(selectedFriendId);

  }, []);

  //  Handling Functions for Showing Archieves
  const handleShowArchivedMessages = async () => {
    try {
      setLoading(true);
      if (!showArchived) {
        const fetchedArchivedMessages = await MessageService.getReadMessages(currentUserId, selectedFriend!);
        setArchivedMessages(fetchedArchivedMessages);
      }
      setShowArchived(!showArchived);
    } catch (err) {
      setError('Failed to fetch archived messages');
      console.error('Error fetching archived messages:', err);
    } finally {
      setLoading(false);
    }
  };

  //  Handling Functions for Marking Message as Read
  const handleMarkAsRead = (messageId: number) => {
    setUnreadMessagesState((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
    dispatch(markMessageAsReadAction(messageId));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 bg-secondary-subtle">
          <SidePanel 
            friends={friends}
            unreadCounts={unreadCounts}
            onSelectedFriend={handleFriendSelect} 
          />
        </div>
        <div className="col-9 bg-light-subtle" style={{ position: "relative" }}>

          {selectedFriend ? (
          <button onClick={handleShowArchivedMessages} className="btn btn-secondary">
          {showArchived ? 'Hide Archived' : 'See More'}
        </button>
          ): (
            <div className='font-monospace text-primary-emphasis mt-5'>
              <h3>Welcome to Your Chatting Getaway!</h3>
              <h6>Where Every Moment Is Worth Sharing</h6>
            </div>

          )}

          <div style={{ marginBottom: "200px" }}>
            {loading && <p>Loading messages...</p>}
            {error && <p>{error}</p>}
            {selectedFriend !== null && (
              <>
                {unreadMessages.length > 0 && (
                  <Messages 
                    messages={unreadMessages}
                    currentUserId={currentUserId} 
                    selectedCorrespondentId={selectedFriend} 
                    onMessageRead={handleMarkAsRead} 
                  />
                )}
                {showArchived && archivedMessages.length > 0 && (
                  <Messages 
                    messages={archivedMessages}
                    currentUserId={currentUserId} 
                    selectedCorrespondentId={selectedFriend} 
                    onMessageRead={handleMarkAsRead} 
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div id="message-sending-wrapper" className="bg-light" style={{ position: "fixed", marginBottom: "55px" }}>
          <MessageSendingCard recipientId={friendId} senderId={currentUserId} />
        </div>
      </div>
    </div>
  );
};

export default MyMessagesPage;
