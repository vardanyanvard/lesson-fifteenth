import axios from "axios";
import { InputUser, IResponse, IUpdatePassword, IUserLogin } from "./types";

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

export const handleUpdatePassword = async (
  data: IUpdatePassword
): Promise<IResponse> => {
  const response = await Axios.patch("/update/password", data);
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

export const handleGetPosts = async (): Promise<IResponse> => {
  const response = await Axios.get("/posts");
  return response.data;
};

export const handlePostCreation = async (
  data: FormData
): Promise<IResponse> => {
  const response = await Axios.post("/posts", data);
  return response.data;
};

export const handleSearch = async (text: string): Promise<IResponse> => {
  const response = await Axios.get("/search/" + text);
  return response.data;
};

export const handleChangeStatus = async (): Promise<IResponse> => {
  const response = await Axios.patch("/account/set");
  return response.data;
};

export const handleGetUser = async (id: string): Promise<IResponse> => {
  const response = await Axios.get(`/account/${id}`);
  return response.data;
};
