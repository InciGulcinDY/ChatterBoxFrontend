import axios from 'axios';
import { MessageModel } from '../models/MessageModel';
import { AddMessageModel } from '../models/AddMessageModel';
import { UserModel } from '../models/UserModel';
import { SuccessResponse } from '../models/SuccessResponse';

const baseURL = 'http://localhost:8080/api/messages';


const getAllById = async (userId: number, friendId: number): Promise<MessageModel[]> => {
  const response = await axios.get<MessageModel[]>(`${baseURL}/${userId}/${friendId}`);
  return response.data;
};

const getAll = async (userId: number): Promise<MessageModel[]> => {
  const response = await axios.get<MessageModel[]>(`${baseURL}/${userId}`);
  return response.data;
};

//  Fetching friends of the user
const getAllFriends = async (userId: number): Promise<UserModel[]> => {
  const response = await axios.get<UserModel[]>(`${baseURL}/users/${userId}`);
  return response.data;
};

const getUnreadMessages = async (userId: number, friendId: number): Promise<MessageModel[]> => {
  const response = await axios.get<MessageModel[]>(`${baseURL}/unread/${userId}/${friendId}`);
  return response.data;
};

const getReadMessages = async (userId: number, friendId: number): Promise<MessageModel[]> => {
  const response = await axios.get<MessageModel[]>(`${baseURL}/read/${userId}/${friendId}`);
  return response.data;
};

const add = async (request: AddMessageModel): Promise<MessageModel> => {
  const response = await axios.post<MessageModel>(`${baseURL}/add`, request);
  return response.data;
};

//    Fetching unread message count for each friend of the user
const getUnreadMessageCounts = async(userId: number): Promise<{ [key: number]: number }> => {
  const response = await fetch(`${baseURL}/unreadMessageCounts/${userId}`);
  return response.json();
}

const markAsRead = async(messageId: number) => {
  return axios.put<SuccessResponse>(`${baseURL}/updateMessageRead/${messageId}`)
  .then(response => {
    console.log(response , messageId +  ": message marked as read!");
    return response;
  })
  .catch(error => {
    console.log(error + ": Something went wrong.");
    return {data: {success: false, message: "Something went wrong."}};
  })
}


const MessageService = {
  getAllById,
  getAll,
  add,
  getAllFriends,
  getUnreadMessages,
  getReadMessages,
  getUnreadMessageCounts,
  markAsRead
};

export default MessageService;
