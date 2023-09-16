import { Chat } from "@/types/chat";
import { User } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UsersState = {
  user: User;
  allUsers: User[]; // Corrigido para ser um array de objetos User
  allChats: Chat[]; // Corrigido para ser um array de objetos Chat
  selectedChat: Chat;
};

const usersSlice = createSlice({
  name: "user",
  initialState: {
    user: {} as User,
    allUsers: [],
    allChats: [],
    selectedChat: {} as Chat,
  } as UsersState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.allUsers = action.payload;
    },
    setAllChats: (state, action: PayloadAction<Chat[]>) => {
      state.allChats = action.payload;
    },
    setSelectedChat: (state, action: PayloadAction<Chat>) => {
      state.selectedChat = action.payload;
    },
  },
});

export const { setUser, setAllUsers, setAllChats, setSelectedChat } =
  usersSlice.actions;
export default usersSlice.reducer;
