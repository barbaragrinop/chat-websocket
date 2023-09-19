import { fetcher } from "@/api";
import useSWR from "swr";

export const useGetCurrentChatMessages = (chatId: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    `/api/messages/get-all-messages/${chatId}`,
    fetcher
  );

  return {
    messages: data,
    isLoading: isLoading,
    isError: error,
    mutate,
  };
};
