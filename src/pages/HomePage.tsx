import React from "react";

import ChatComponent from "../components/ChatComponent";

const HomePage: React.FC = () => (
  <div className="pt-28 pb-6 px-6 xl:px-0 h-full min-h-mobile-screen flex flex-col max-w-screen-sm overflow-hidden">
    <ChatComponent />
  </div>
);
export default HomePage;
