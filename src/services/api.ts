import axios from "axios";

interface Token {
  accessToken: string;
  refreshToken: string;
}
interface User {
  email: string;
  password: string;
}
interface SignInResponse extends User {}
interface SignUpResponse extends SignInResponse {
  username: string;
}

const loadTokens = (): Token => {
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = document.cookie
    .split(";")
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];
  return {
    accessToken: accessToken || "",
    refreshToken: refreshToken || "",
  };
};

const saveTokens = (token: Token) => {
  localStorage.setItem("refreshToken", token.refreshToken);
  document.cookie = `accessToken=${token.accessToken}`;
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error occurred:", error);
    return Promise.reject(error);
  },
);
export const signUp = (
  user: User,
  // eslint-disable-next-line no-unused-vars
  callback: ({ username, email, password }: SignUpResponse) => void,
) => {
  api.post("/auth/signup", user).then((res) => {
    saveTokens({
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    });
    callback(res.data);
  });
};
export const signIn = (
  user: User,
  // eslint-disable-next-line no-unused-vars
  callback: ({ email, password }: SignInResponse) => void,
) => {
  api.post("/auth/signin", user).then((res) => {
    saveTokens({
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    });
    callback(res.data);
  });
};
export const refresh = (): void => {
  api
    .post("/auth/refresh", { refreshToken: loadTokens().refreshToken })
    .then((res) => {
      saveTokens(res.data);
    });
};
// eslint-disable-next-line no-unused-vars
export const createChat = (name: string, callback: (data: any) => void) => {
  api.post(`/chat/${name}`).then((res) => {
    callback(res.data);
  });
};
// eslint-disable-next-line no-unused-vars
export const getChats = (callback: (data: any) => void) => {
  api.get(`/chat/all`).then((res) => {
    callback(res.data);
  });
};
// eslint-disable-next-line no-unused-vars
export const getChatByID = (id: string, callback: (data: any) => void) => {
  api.get(`/chat/${id}`).then((res) => {
    callback(res.data);
  });
};
// eslint-disable-next-line no-unused-vars
export const deleteChat = (id: string, callback: (data: any) => void) => {
  api.delete(`/chat/${id}`).then((res) => {
    callback(res.data);
  });
};
export default api;
