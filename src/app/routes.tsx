import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "../components/Layout"; // Общий layout для страниц
// Импортируем страницы и компоненты
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      {/* Определяем базовый Layout для всех страниц */}
      <Route path="/" element={<Layout />}>
        {/* Основные страницы */}
        <Route index element={<HomePage />} /> {/* Главная страница */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
