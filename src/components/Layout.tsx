import { motion } from "framer-motion";
import React from "react";
import { Outlet } from "react-router-dom";

import Backgound from "./Backgound";
import HeaderComponent from "./HeaderComponent";

const Layout: React.FC = () => (
  <>
    <HeaderComponent />
    <motion.div
      animate={{
        opacity: 1,
        transition: {
          ease: "easeOut",
          duration: 0.3,
          delay: 2.5,
        },
      }}
      className="min-h-mobile-screen max-h-mobile-screen opacity-0 columns-1 xl:columns-2 relative"
    >
      <Backgound className="xl:static" />
      <main className="relative z-10 pt-28 pb-6 px-4 md:px-0 xl:pl-0 xl:pr-2 h-full w-full min-h-mobile-screen flex flex-col md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-sm overflow-hidden md:mx-auto xl:mx-0">
        <Outlet />
      </main>
    </motion.div>
  </>
);

export default Layout;
