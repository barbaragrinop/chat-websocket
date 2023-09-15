import { createNewChat } from "@/api/chats";
import { Button } from "@/components/Button";
import { hideLoader, showLoader } from "@/redux/loader-slice";
import { setAllChats } from "@/redux/users-slice";
import { User as UserType } from "@/types/user";
import { ObjectId } from "mongodb";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  user: UserType;
};

export default function User({ user: currentMappedUser }: Props) {
  const dispatch = useDispatch();

  const { allChats, user } = useSelector((state: any) => state.userReducer);

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

  return (
    <div
      className="border flex justify-between rounded-2xl p-5 bg-white shadow-sm"
      key={currentMappedUser.profilePic + currentMappedUser.email}
    >
      <div className="flex gap-5">
        <img
          src={
            currentMappedUser.profilePic
              ? currentMappedUser.profilePic
              : "https://forum.truckersmp.com/uploads/monthly_2019_09/imported-photo-12263.thumb.png.0a337947bd0458971e73616909a5b1f8.png"
          }
          alt="Profile Picture"
          className="w-10 h-10 rounded-full"
        />
        <h1>{currentMappedUser.name}</h1>
      </div>
      <div onClick={() => createNewUsersChat(currentMappedUser._id!)}>
        {!allChats.find((chat: any) =>
          chat.members.includes(currentMappedUser._id)
        ) && <Button.CreateChat />}
      </div>
    </div>
  );
}
