import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "../components/Layout";
import LayoutChat from "../components/LayoutChat";
import ChatPage from "../pages/ChatPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/chat" element={<LayoutChat />}>
        <Route path="/chat/:id" element={<ChatPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
