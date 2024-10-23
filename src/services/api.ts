import axios from "axios";

import { Chat, Message, SignInData, SignUpData, Token, User } from "../types";

const loadTokens = (): Token => {
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = document.cookie
    .split(";")
    .find((row) => row.includes("accessToken="))
    ?.split("=")[1];
  return {
    accessToken: accessToken || "",
    refreshToken: refreshToken || "",
  };
};

const saveTokens = (token: Token) => {
  localStorage.setItem("refreshToken", token.refreshToken);
  const yearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
  const expiryDate = new Date(Date.now() + yearInMilliseconds).toUTCString();
  document.cookie = `accessToken=${token.accessToken}; expires=${expiryDate};`;
};

const deleteTokens = (callback: () => void) => {
  saveTokens({ accessToken: "", refreshToken: "" });
  callback();
};

const tokens = loadTokens();

const api = axios.create({
  baseURL: "http://hackers54.ru:3000/api",
  headers: {
    ...(tokens.accessToken && {
      Authorization: `Bearer ${tokens.accessToken}`,
    }),
  },
});

api.interceptors.request.use(
  (config) => {
    const tokens = loadTokens();
    if (tokens.accessToken) {
      config.headers["Authorization"] = `Bearer ${tokens.accessToken}`; // обновляем заголовок Authorization
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const signUp = async (user: SignUpData): Promise<User> => {
  const res = await api.post("/auth/signup", user);
  saveTokens({
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  });
  return res.data.user;
};

export const signIn = async (user: SignInData): Promise<User> => {
  const res = await api.post("/auth/signin", user);
  saveTokens({
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  });
  return res.data.user;
};

export const self = async (): Promise<User> => {
  const res = await api.get("/user/self");
  return res.data;
};

export const signOut = async (): Promise<void> => {
  deleteTokens(() => {});
};

export const refresh = async (): Promise<void> => {
  const res = await api.post("/auth/refresh", {
    refreshToken: loadTokens().refreshToken,
  });
  saveTokens(res.data);
};

export const createChat = async (name: string): Promise<Chat> => {
  const res = await api.post(`/chat/${name}`);
  delete res.data.userUuid;
  return res.data;
};

export const getChats = async (): Promise<Chat[]> => {
  const res = await api.get(`/chat/all`);
  return res.data;
};

export const getChatByID = async (id: string): Promise<Message[]> => {
  const res = await api.get(`/chat/${id}`);
  return res.data;
};

export const deleteChat = async (id: string): Promise<Chat> => {
  const res = await api.delete(`/chat/${id}`);
  return res.data;
};

export default api;
