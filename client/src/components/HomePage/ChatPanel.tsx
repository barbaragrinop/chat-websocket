import { useDispatch, useSelector } from "react-redux";
import UserProfilePicture from "./UserProfilePicture";
import { AiOutlineSend } from "react-icons/ai";
import { Message } from "@/types/messages";
import { useEffect, useState } from "react";
import { SendMessage, resetUnreadMessageCount } from "@/api/messages";
import { hideLoader, showLoader } from "@/redux/loader-slice";
import toast from "react-hot-toast";
import { useGetCurrentChatMessages } from "@/hooks/useGetCurrentChatMessage";
import { formatDateTime } from "@/utils/formatDateTime";
import { BsCheck2, BsCheck2All } from "react-icons/bs";
import { Chat } from "@/types/chat";
import { setAllChats } from "@/redux/users-slice";

export function ChatPanel() {
  const dispatch = useDispatch();
  const { allChats, selectedChat, user } = useSelector(
    (state: any) => state.userReducer
  );
  const [newMessage, setNewMessage] = useState<string>("");
  const { messages, isError, isLoading, mutate } = useGetCurrentChatMessages(
    selectedChat._id
  );

  useEffect(() => {
    isLoading ? dispatch(showLoader()) : dispatch(hideLoader());
    isError && toast.error("Error fetching messages");
    mutate();
    clearUnreadMessages();
  }, [selectedChat]);

  async function clearUnreadMessages() {
    try {
      dispatch(showLoader());
      const response = await resetUnreadMessageCount(selectedChat._id);
      dispatch(hideLoader());
      if (response.success) {
        const updatedChats = allChats.map((chat: Chat) => {
          if (chat._id === selectedChat._id) {
            return response.data;
          }
          return chat;
        });

        dispatch(setAllChats(updatedChats));
      } else {
        toast.error(response.message);
        dispatch(hideLoader());
      }
    } catch (error: any) {
      dispatch(hideLoader());
      toast.error(error);
    }
  }

  const receipentUser =
    selectedChat.members &&
    selectedChat.members.find((member: any) => member._id !== user._id);

  async function sendNewMessage() {
    try {
      dispatch(showLoader());
      const message: Message = {
        chat: selectedChat._id,
        sender: user._id,
        text: newMessage,
      };
      const response = await SendMessage(message);
      mutate();
      dispatch(hideLoader());

      if (response.sucess) {
        setNewMessage("");
      }
    } catch (error: any) {
      dispatch(hideLoader());
      toast.error(error);
    }
  }

  function getHourLastMessage(massageCreatedDate?: Date) {
    if (massageCreatedDate) return formatDateTime(massageCreatedDate);
    return "";
  }

  return (
    <div className="p-5 box-border bg-white h-[82vh] border rounded-2xl flex flex-col items justify-between">
      <div className="h-[60px] ">
        {receipentUser && (
          <div className="flex gap-3 items-center border-b-[1px] pb-4">
            <UserProfilePicture profilePicture={receipentUser.profilePic} />
            <span>{receipentUser.name}</span>
          </div>
        )}
      </div>
      <div className="overflow-auto py-5 pr-4 h-[calc(100vh_-_120px)] ">
        {messages &&
          messages.data &&
          messages.data?.map((message: Message) => {
            const isCurrentUserTheSender = message.sender === user._id;
            return (
              <div
                key={message.sender.email + message.createdAt}
                className={`flex overflow-hidden flex-col gap-1  ${
                  message.sender === user._id ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl break-words max-w-[90%] ${
                    message.sender === user._id
                      ? "bg-primary text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
                <span className="text-xs text-gray-500 flex gap-2 items-center">
                  {getHourLastMessage(message.createdAt)}
                  {isCurrentUserTheSender && message.read ? (
                    <BsCheck2All className="text-lg text-primary" />
                  ) : (
                    isCurrentUserTheSender &&
                    !message.read && (
                      <BsCheck2 className="text-lg text-gray-500" />
                    )
                  )}
                </span>
              </div>
            );
          })}
      </div>
      <div className="h-[60px] ">
        <div className="h-14 rounded-xl border flex overflow-hidden">
          <input
            type="text"
            name="message"
            id="message"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            className="w-[90%] h-full border-0  rounded-l-xl   p-5"
          />
          <button
            onClick={sendNewMessage}
            className="w-[10%] bg-opacity-[0.15] bg-primary h-full  rounded-r-md flex items-center justify-center text-primary font-bold "
          >
            <AiOutlineSend className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
