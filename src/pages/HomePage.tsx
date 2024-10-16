import React from "react";

import ChatComponent from "../components/ChatComponent";

const HomePage: React.FC = () => (
  <div className="pt-28 pb-6 px-4 xl:pl-0 xl:pr-2 h-full w-full min-h-mobile-screen flex flex-col max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-sm overflow-hidden mx-auto xl:mx-0">
    <ChatComponent />
  </div>
);
export default HomePage;
