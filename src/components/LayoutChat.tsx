import { motion } from "framer-motion";
import React from "react";
import { Outlet } from "react-router-dom";

import Backgound from "./Backgound";
import HeaderComponent from "./HeaderComponent";

const LayoutChat: React.FC = () => (
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
      className="min-h-mobile-screen max-h-mobile-screen opacity-0 columns-1 relative"
    >
      <Backgound />
      <main className="relative z-10">
        <Outlet />
      </main>
    </motion.div>
  </>
);

export default LayoutChat;
