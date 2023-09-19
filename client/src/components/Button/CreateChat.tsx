import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function CreateChat(props?: ButtonProps) {
  return (
    <button
      {...props}
      className="border-primary min-w-[96.25px] max-h-[40px] text-primary px-3 py-1 rounded-md bg-white border"
    >
      New Chat
    </button>
  );
}
