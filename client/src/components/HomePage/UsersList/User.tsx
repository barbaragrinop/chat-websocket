import { createNewChat } from "@/api/chats";
import { Button } from "@/components/Button";
import { hideLoader, showLoader } from "@/redux/loader-slice";
import { setAllChats, setSelectedChat } from "@/redux/users-slice";
import { User as UserType } from "@/types/user";
import { ObjectId } from "mongodb";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import UserProfilePicture from "../UserProfilePicture";

type Props = {
  user: UserType;
};

export default function User({ user: currentMappedUser }: Props) {
  const dispatch = useDispatch();

  const { allChats, user, selectedChat } = useSelector(
    (state: any) => state.userReducer
  );

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

  return (
    <div
      className={`cursor-pointer flex justify-between rounded-xl  p-3  bg-shadow-sm 
        hover:border-primary border-2 transition-all
          ${highlightChat() ? "bg-primary text-white " : "bg-white"}
        `}
      onClick={() => openChat()}
    >
      <div className="flex gap-5">
        <UserProfilePicture profilePicture={currentMappedUser.profilePic} />
        <h1>{currentMappedUser.name}</h1>
      </div>
      <div onClick={() => createNewUsersChat(currentMappedUser._id!)}>
        {!allChats.find((chat: any) =>
          chat.members
            .map((member: UserType) => member._id)
            .includes(currentMappedUser._id)
        ) && <Button.CreateChat />}
      </div>
    </div>
  );
}
