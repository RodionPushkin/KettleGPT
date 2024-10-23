import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createChat,
  deleteChat,
  getChatByID,
  getChats,
} from "../../services/api";
import { Chat } from "../../types";

const initialState: Chat[] = [];

export const fetchChats = createAsyncThunk("chats/fetchChats", async () => {
  const response = await getChats();
  return response;
});

export const fetchChatMessages = createAsyncThunk(
  "chats/fetchChatMessages",
  async (id: string) => {
    const response = await getChatByID(id);
    return { id, messages: response };
  },
);

export const createNewChat = createAsyncThunk(
  "chats/createNewChat",
  async (name: string) => {
    const response = await createChat(name);
    return response;
  },
);

export const removeChatByID = createAsyncThunk(
  "chats/removeChatByID",
  async (id: string) => {
    await deleteChat(id);
    return id;
  },
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, (_, action) => action.payload)
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        const chat = state.find((chat) => chat.id === action.payload.id);
        if (chat) chat.messages = action.payload.messages;
      })
      .addCase(createNewChat.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(removeChatByID.fulfilled, (state, action) => {
        const index = state.findIndex((chat) => chat.id === action.payload);
        state.splice(index, 1);
      });
  },
});

export default chatSlice.reducer;
