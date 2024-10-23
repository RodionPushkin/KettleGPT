import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import chatReducer from "./slices/chatSlice";
import soundReducer from "./slices/soundSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    sound: soundReducer,
    user: userReducer,
    chat: chatReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
