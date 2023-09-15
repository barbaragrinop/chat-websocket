import { axiosInstance } from ".";

export const getAllChats = async () => {
  try {
    const response = await axiosInstance.get("/api/chats/get-all-chats");
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const createNewChat = async (members: any) => {
  console.log("members", members);
  try {
    const response = await axiosInstance.post("/api/chats/create-new-chat", {
      members,
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
