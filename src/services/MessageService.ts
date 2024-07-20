import axios from "axios";
import { MessageModel } from "../models/MessageModel";
import { UserModel } from "../models/UserModel";
import { SuccessResponse } from "../models/SuccessResponse";
import { SentMessageModel } from "../models/SentMessageModel";
import { ChatMessageModel } from "../models/ChatMessageModel";
import { API_BASE_URL } from "../utils/constants/apiConstants";
import { RoomModel } from "../models/RoomModel";

const baseURL = `${API_BASE_URL}/message`;


//  Fetching all rooms that 
const getAllRooms = async(userId: number) : Promise<RoomModel[]> => {
  const response = await axios.get<RoomModel[]>(`http://localhost:8080/message/rooms/${userId}`);
  return response.data;
}

//  Fetching all messages in the relevant room
const getAllMessages = async(room:string): Promise<ChatMessageModel[]> => {
  const response = await axios.get<ChatMessageModel[]>(`${baseURL}/${room}`);
  return response.data;
}


// TODO: Delete functions below!

//  Fetching all messages of the user and his/her friend
const getAllByFriend = async (
  userId: number,
  friendId: number
): Promise<MessageModel[]> => {
  const response = await axios.get<MessageModel[]>(
    `${baseURL}/getAllByFriend/${userId}/${friendId}`
  );
  return response.data;
};

//  Fetching all messages for the relevant user
const getAll = async (userId: number): Promise<MessageModel[]> => {
  const response = await axios.get<MessageModel[]>(`${baseURL}/getAll/${userId}`);
  return response.data;
};

//  Fetching lists of friends that match the user
const getAllFriends = async (userId: number): Promise<UserModel[]> => {
  const response = await axios.get<UserModel[]>(`${baseURL}/users/${userId}`);
  return response.data;
};

// Fetching all UNREAD messages of the user and his/her friend
const getUnreadMessages = async (
  userId: number,
  friendId: number
): Promise<MessageModel[]> => {
  const response = await axios.get<MessageModel[]>(
    `${baseURL}/unread/${userId}/${friendId}`
  );
  return response.data;
};

// Fetching all READ messages of the user and his/her friend
const getReadMessages = async (
  userId: number,
  friendId: number
): Promise<MessageModel[]> => {
  const response = await axios.get<MessageModel[]>(
    `${baseURL}/read/${userId}/${friendId}`
  );
  return response.data;
};


//  Fetching unread message count for each friend of the user
const getUnreadMessageCounts = async (
  userId: number
): Promise<{ [key: number]: number }> => {
  const response = await fetch(`${baseURL}/unreadMessageCounts/${userId}`);
  return response.json();
};

//  Sends a request for updating the message by marking as READ
const markAsRead = async (messageId: number) => {
  return axios
    .put<SuccessResponse>(`${baseURL}/updateMessageRead/${messageId}`)
    .then((response) => {
      console.log(response, messageId + ": message marked as read!");
      return response;
    })
    .catch((error) => {
      console.log(error + ": Something went wrong.");
      return { data: { success: false, message: "Something went wrong." } };
    });
};

const MessageService = {
  getAllRooms,
  getAllMessages,
  getAllByFriend,
  getAll,
  getAllFriends,
  getUnreadMessages,
  getReadMessages,
  getUnreadMessageCounts,
  markAsRead,
};

export default MessageService;
