import { User } from "@/types/user";
import { axiosInstance } from ".";

export const registerUser = async (user: User) => {
  try {
    const response = await axiosInstance.post("/api/users/register", user);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const loginUser = async (user: Omit<User, "name">) => {
  try {
    const response = await axiosInstance.post("/api/users/login", user);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-current-user");
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-all-users");
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
