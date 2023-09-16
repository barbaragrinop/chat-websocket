import { fetcher } from "@/api";
import useSWR from "swr";

export const useCurrentChatMessages = (chatId: string) => {
  const { data, error, mutate } = useSWR(
    `/api/messages/get-all-messages/${chatId}`,
    fetcher
  );

  return {
    messages: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
