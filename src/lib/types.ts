export interface IUser {
  id: string;
  name: string;
  surname: string;
  login: string;
  password: string;
  isPrivate: number;
  cover: string;
  picture: string;
}

export interface IResponse {
  status: string;
  message?: string;
  payload?: unknown;
  user?: IWideUser;
}

export interface IUserLogin {
  login: string;
  password: string;
}

export type InputUser = Omit<IUser, "id" | "isPrivate" | "cover" | "picture">;

export interface IWideUser extends IUser {
  followers?: IUser[];
  following?: IUser[];
}

export interface IViewUser extends Omit<IWideUser, "login" & "password"> {
  available: true;
  connection: {
    following: false;
    followsMe: false;
    requested: false;
    blockedMe: false;
    didIBlock: false;
  };
  posts: [];
}

export interface IContextType {
  account: IWideUser;
  viewUser: IViewUser;
  setAccount: (user: IWideUser) => void;
  setViewUser: (user: IViewUser) => void;
}

export interface IPost {
  id: number;
  title: string;
  picture: string;
}

export interface IUpdatePassword {
  old: string;
  newpwd: string;
}
