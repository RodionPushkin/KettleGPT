export type Source = {
  src: string;
  repeat?: boolean;
};
export type Sound = {
  source: Source[];
  counter?: number;
};
export type SoundState = {
  isMuted: boolean;
  sounds: { [key: string]: Sound };
};
export type Message = {
  id: string;
  message: string;
  createdAt: string;
  isFromAI: boolean;
  chatId: string;
};
export type Chat = {
  id: string;
  name: string;
  createdAt: string;
  messages?: Message[];
};
export type Token = {
  accessToken: string;
  refreshToken: string;
};
export type Role = {
  uuid: string;
  name: string;
};
export type User = {
  uuid: string;
  username: string;
  email: string;
  isActive: boolean;
  roleUuid: string;
  role: Role | null;
};
export interface SignInData {
  password: string;
  email: User["email"];
}
export interface SignUpData extends SignInData {
  username: string;
}
