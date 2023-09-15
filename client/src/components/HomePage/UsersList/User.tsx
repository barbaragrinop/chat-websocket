import { User as UserType } from "@/types/user";
import React from "react";

type Props = {
  user: UserType;
};

export default function User({ user }: Props) {
  return (
    <div
      className="border rounded-2xl p-5 bg-white shadow-sm"
      key={user.profilePic + user.email}
    >
      <div className="flex gap-5">
        <img
          src={
            user.profilePic
              ? user.profilePic
              : "https://forum.truckersmp.com/uploads/monthly_2019_09/imported-photo-12263.thumb.png.0a337947bd0458971e73616909a5b1f8.png"
          }
          alt="Profile Picture"
          className="w-10 h-10 rounded-full"
        />
        <h1>{user.name}</h1>
      </div>
    </div>
  );
}
