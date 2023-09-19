import { createNewChat } from "@/api/chats";
import { Button } from "@/components/Button";
import { hideLoader, showLoader } from "@/redux/loader-slice";
import { setAllChats, setSelectedChat } from "@/redux/users-slice";
import { User as UserType } from "@/types/user";
import { ObjectId } from "mongodb";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import UserProfilePicture from "../UserProfilePicture";
import { Chat } from "@/types/chat";
import { formatDateTime } from "@/utils/formatDateTime";

type Props = {
  user: UserType;
};

export default function User({ user: currentMappedUser }: Props) {
  const dispatch = useDispatch();

  const { allChats, user, selectedChat } = useSelector(
    (state: any) => state.userReducer
  );

  const chat = allChats.find((chat: Chat) =>
    chat.members
      .map((member: UserType) => member._id)
      .includes(currentMappedUser._id)
  );

  function getLastMessage(): string {
    if (!chat) return "";
    const lastMsgSender = chat?.lastMessage?.sender === user._id ? "You: " : "";
    const msg = chat.lastMessage ? chat.lastMessage?.text : "";

    return `${lastMsgSender + msg}`;
  }

  function getHourLastMessage() {
    if (!chat) return "";
    if (!chat.lastMessage) return "";
    return formatDateTime(chat.lastMessage.createdAt);
  }

  async function createNewUsersChat(receipentUserId: ObjectId) {
    try {
      dispatch(showLoader());
      const response = await createNewChat([user._id, receipentUserId]);
      dispatch(hideLoader());
      if (response.sucess) {
        toast.success("Chat created successfully");
        const newChat = response.data;
        const updatedChats = [...allChats, newChat];
        dispatch(setAllChats(updatedChats));
        dispatch(setSelectedChat(newChat));
        openChat();
      } else {
        toast.error("Error creating chat");
      }
    } catch (error: any) {
      dispatch(hideLoader());
      toast.error("Error creating chat", error.message);
    }
  }

  function openChat() {
    const chat = allChats.find(
      (chat: any) =>
        chat.members.map((m: UserType) => m._id).includes(user._id) &&
        chat.members.map((m: UserType) => m._id).includes(currentMappedUser._id)
    );

    if (chat) {
      dispatch(setSelectedChat(chat));
    }
  }

  function highlightChat() {
    if (selectedChat.members) {
      return selectedChat?.members
        .map((member: UserType) => member._id)
        .includes(currentMappedUser._id);
    }

    return "";
  }

  function getUnreadMessages() {
    if (!allChats) return;
    const chat: Chat = allChats.find((chat: any) =>
      chat.members
        .map((mem: UserType) => mem._id)
        .includes(currentMappedUser._id)
    );
    if (chat && chat.unreadMessages && chat.lastMessage.sender !== user._id) {
      return (
        <div className="flex items-center justify-center  w-5 h-5 py-2 bg-primary rounded-full">
          <small className="text-white text-center mt-[2px] ">
            {chat.unreadMessages}
          </small>
        </div>
      );
    }
  }
  return (
    <div
      className={`cursor-pointer min-w-full flex justify-between rounded-xl  p-3  bg-shadow-sm  max-w-[384px] overflow-hidden 
        hover:border-primary border-2 transition-all
          ${
            highlightChat()
              ? "bg-primary bg-opacity-25 text-white "
              : "bg-white"
          }
        `}
      onClick={() => openChat()}
    >
      <div className="flex gap-5 w-full max-">
        <UserProfilePicture profilePicture={currentMappedUser.profilePic} />
        <div className="flex flex-col w-full ">
          <div className="flex gap-1 justify-between  ">
            <h1 className="w-48 overflow-hidden text-ellipsis whitespace-nowrap  ">
              {currentMappedUser.name}
            </h1>
            {getUnreadMessages()}
          </div>
          <small className="text-gray-500 w-56 overflow-hidden text-ellipsis whitespace-nowrap  ">
            {getLastMessage()}
          </small>
          <small className="text-gray-500 text-[11.5px] text-end w-full ">
            {getHourLastMessage()}
          </small>
        </div>
      </div>
      <div className="whitespace-nowrap">
        {!allChats.find((chat: any) =>
          chat.members
            .map((member: UserType) => member._id)
            .includes(currentMappedUser._id)
        ) && (
          <Button.CreateChat
            onClick={() => {
              createNewUsersChat(currentMappedUser._id!).then(() => {
                openChat();
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
