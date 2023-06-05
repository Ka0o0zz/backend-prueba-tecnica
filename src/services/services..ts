import axios, { AxiosResponse } from "axios";

export const axiosCall = async (url: string) => {
  try {
    const { data }: AxiosResponse = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
};
