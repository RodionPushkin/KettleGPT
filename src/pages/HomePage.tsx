import React from "react";

import { useSoundContext } from "../components/SoundProvider";

const HomePage: React.FC = () => {
  const { click, hover, toggle, pageExit, pageEnter } = useSoundContext();
  return (
    <div>
      <h1 onClick={toggle}>mute</h1>
      <h1 onClick={click.play}>Welcome to the Home Page</h1>
      <h1 onClick={pageEnter.play}>Welcome to the Home Page</h1>
      <h1 onClick={pageExit.play}>Welcome to the Home Page</h1>
      <p onMouseEnter={hover.play}>This is the main page of the website.</p>
      <p onMouseEnter={hover.play}>This is the main page of the website.</p>
      <p onMouseEnter={hover.play}>This is the main page of the website.</p>
    </div>
  );
};

export default HomePage;
