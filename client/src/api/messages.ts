import { Message } from "@/types/messages";
import { axiosInstance, fetcher } from ".";
import useSWR from "swr";

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
  try {
    const response = await axiosInstance.get(
      `/api/messages/get-all-messages/${chatId}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
