import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ChatComponent from "../components/ChatComponent";
import { fetchChats } from "../store/slices/chatSlice";
import { AppDispatch, RootState } from "../store/store";

const NotFoundPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const chats = useSelector((state: RootState) => state.chat);
  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);
  console.log(chats);
  return (
    <>
      <h1 className="text-3xl font-bold">Chat {id}</h1>
      <ChatComponent />
    </>
  );
};

export default NotFoundPage;
