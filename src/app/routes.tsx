import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "../components/Layout";
import LayoutChat from "../components/LayoutChat";
import ChatPage from "../pages/ChatPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import PresentationPage from "../pages/PresentationPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/sign/in" element={<SignInPage />} />
        <Route path="/sign/up" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/" element={<LayoutChat />}>
        <Route path="/presentation" element={<PresentationPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
