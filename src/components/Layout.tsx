import React from "react";
import { Outlet } from "react-router-dom";

import Backgound from "./Backgound";
import HeaderComponent from "./HeaderComponent";

const Layout: React.FC = () => (
  <>
    <HeaderComponent />
    <div className="min-h-mobile-screen columns-1 xl:columns-2 relative">
      <Backgound className="xl:static" />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  </>
);

export default Layout;
