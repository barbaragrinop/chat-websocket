import axios from "axios";

// Função para criar uma instância do axios com o token JWT
const createAxiosInstance = () => {
  const token = localStorage.getItem("token");
  console.log("token", token);

  return axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const axiosInstance = createAxiosInstance();

export const fetcher = async (url: string) => {
  const response = await axiosInstance.get(url);
  return response.data;
};
