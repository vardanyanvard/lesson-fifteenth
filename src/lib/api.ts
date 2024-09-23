import axios from "axios";
import { InputUser, IResponse, IUserLogin } from "./types";

const Axios = axios.create({
  baseURL: "http://localhost:4002",
});

export const handleSignup = async (user: InputUser): Promise<IResponse> => {
  const response = await Axios.post("/signup", user);
  return response.data;
};

export const handleUserLogin = async (
  userLogin: IUserLogin
): Promise<IResponse> => {
  const response = await Axios.post("/login", userLogin);
  return response.data;
};
