export interface IUser {
  id: string;
  name: string;
  surname: string;
  login: string;
  password: string;
  isPrivate: boolean;
  cover: string;
  picture: string;
}

export interface IResponse {
  status: string;
  message?: string;
  payload?: unknown;
}

export interface IUserLogin {
  login: string;
  password: string;
}

export type InputUser = Omit<IUser, "id" | "isPrivate" | "cover" | "picture">;
