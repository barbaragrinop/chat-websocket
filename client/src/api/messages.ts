import { Message } from "@/types/messages";
import { axiosInstance } from ".";

export const SendMessage = async (message: Message) => {
  try {
    const response = await axiosInstance.post(
      "/api/messages/new-message",
      message
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getCurrentChatMessages = async (chatId: string) => {
  console.log("chatId", chatId);
  try {
    const response = await axiosInstance.get(
      `/api/messages/get-all-messages/${chatId}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
