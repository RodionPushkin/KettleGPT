import React from "react";
import { Outlet } from "react-router-dom";

import Backgound from "./Backgound";
import HeaderComponent from "./HeaderComponent";

const LayoutChat: React.FC = () => (
  <>
    <HeaderComponent />
    <div className="min-h-mobile-screen columns-1 relative">
      <Backgound />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  </>
);

export default LayoutChat;
