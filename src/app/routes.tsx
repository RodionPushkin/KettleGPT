import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Layout from "../components/Layout";
import LayoutChat from "../components/LayoutChat";
import ChatPage from "../pages/ChatPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import PresentationPage from "../pages/PresentationPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import { loadUser } from "../store/slices/userSlice";
import { AppDispatch, RootState } from "../store/store";

const AppRoutes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.uuid.length > 0,
  );
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/sign/in"
            element={isLoggedIn ? <Navigate to="/" /> : <SignInPage />}
          />
          <Route
            path="/sign/up"
            element={isLoggedIn ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/" element={<LayoutChat />}>
          <Route path="/presentation" element={<PresentationPage />} />
          <Route
            path="/chat/:id"
            element={isLoggedIn ? <ChatPage /> : <Navigate to="/sign/in" />}
          />
          <Route
            path="/chat"
            element={isLoggedIn ? <ChatPage /> : <Navigate to="/sign/in" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
