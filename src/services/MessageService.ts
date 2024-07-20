import axios from "axios";
import { ChatMessageModel } from "../models/ChatMessageModel";
import { API_BASE_URL } from "../utils/constants/apiConstants";
import { RoomModel } from "../models/RoomModel";

const baseURL = `${API_BASE_URL}/message`;


//  Fetching all rooms that 
const getAllRooms = async(userId: number) : Promise<RoomModel[]> => {
  const response = await axios.get<RoomModel[]>(`${baseURL}/rooms/${userId}`);
  return response.data;
}

//  Fetching all messages in the relevant room
const getAllMessages = async(room:string): Promise<ChatMessageModel[]> => {
  const response = await axios.get<ChatMessageModel[]>(`${baseURL}/${room}`);
  return response.data;
}

const MessageService = {
  getAllRooms,
  getAllMessages,
};

export default MessageService;
