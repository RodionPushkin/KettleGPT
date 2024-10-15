import React from "react";
import { Link } from "react-router-dom";
const NotFoundPage: React.FC = () => (
  <div className="pt-28 pb-6 px-6 xl:px-0 h-full min-h-mobile-screen flex flex-col max-w-screen-sm overflow-hidden">
    <h1 className="text-3xl font-bold">404 - Такой страницы нет</h1>
    <Link className="text-secondary mt-4" to="/">
      Вернуться на главную
    </Link>
  </div>
);
export default NotFoundPage;
