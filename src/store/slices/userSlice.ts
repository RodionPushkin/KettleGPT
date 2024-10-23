import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { self, signIn, signOut, signUp } from "../../services/api";
import { SignInData, SignUpData, User } from "../../types";

const initialState: User = {
  uuid: "",
  username: "",
  email: "",
  isActive: false,
  roleUuid: "",
  role: null,
};

export const loadUser = createAsyncThunk("user/loadUser", async () => {
  const response = await self();
  return response;
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: SignInData) => {
    const response = await signIn(data);
    return response;
  },
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data: SignUpData) => {
    const response = await signUp(data);
    return response;
  },
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await signOut();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (_, action) => action.payload)
      .addCase(loginUser.fulfilled, (_, action) => action.payload)
      .addCase(registerUser.fulfilled, (_, action) => action.payload)
      .addCase(logoutUser.fulfilled, () => initialState);
  },
});

export default userSlice.reducer;
