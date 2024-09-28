import axios from "axios";
import { InputUser, IResponse, IUserLogin } from "./types";

const Axios = axios.create({
  baseURL: "http://localhost:4002",
  withCredentials: true,
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

export const handleVerify = async (): Promise<IResponse> => {
  const response = await Axios.get("/verify");
  return response.data;
};

export const handlePictureUpload = async (
  data: FormData
): Promise<IResponse> => {
  const response = await Axios.patch("/profile/upload", data);
  return response.data;
};

export const handleCoverUpload = async (data: FormData): Promise<IResponse> => {
  const response = await Axios.patch("/cover/upload", data);
  return response.data;
};
