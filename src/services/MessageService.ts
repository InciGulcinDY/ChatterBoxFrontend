import axios from "axios";
import { MessageModel } from "../models/MessageModel";
import { UserModel } from "../models/UserModel";
import { SuccessResponse } from "../models/SuccessResponse";
import { SentMessageModel } from "../models/SentMessageModel";

const baseURL = "http://localhost:8080/api/messages";


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

//  Send a request for creating new message on the DB
const add = async (request: SentMessageModel): Promise<MessageModel> => {
  const response = await axios.post<MessageModel>(`${baseURL}/add`, request);
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
  getAllByFriend,
  getAll,
  add,
  getAllFriends,
  getUnreadMessages,
  getReadMessages,
  getUnreadMessageCounts,
  markAsRead,
};

export default MessageService;
