import { motion, stagger, useAnimate } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import logo from "/favicon.svg";

import MuteButton from "./MuteButton";
import { useSoundContext } from "./SoundProvider";

const HeaderComponent: React.FC = () => {
  const { click, hover } = useSoundContext();
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const staggerList = stagger(0.1, { startDelay: 0.25 });
  const isLoggedIn = useRef(true);
  useEffect(() => {
    animate(
      "ul",
      {
        width: open ? "16rem" : 0,
        height: open ? "12rem" : 0,
        opacity: open ? 1 : 0,
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.4,
      },
    );
    animate(
      "li",
      open
        ? { opacity: 1, scale: 1, x: 0 }
        : { opacity: 0, scale: 0.3, x: -50 },
      {
        duration: 0.2,
        delay: open ? staggerList : 0,
      },
    );
  }, [open]);
  return (
    <header
      className="fixed top-6 left-0 flex justify-center w-screen z-[9999] px-4 select-none"
      ref={scope}
    >
      <div className="flex w-full h-16 gap-4 items-center bg-transparent rounded-full px-6 max-w-screen-md relative lg:max-w-screen-lg xl:max-w-screen-xl">
        <Link
          to="/"
          className="text-l sm:text-xl font-bold flex items-center gap-2"
        >
          <img className="h-6 sm:h-8" src={logo} alt="logo" />
          <h1>
            {"Kettle GPT".split("").map((el, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.25,
                  delay: i / 10 + 0.5,
                }}
                key={i}
              >
                {el}
              </motion.span>
            ))}
            {"...".split("").map((el, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1.5,
                  delay: i / 10 + 0.5 + 3,
                  repeat: Infinity,
                }}
                key={i}
              >
                {el}
              </motion.span>
            ))}
          </h1>
        </Link>
        <MuteButton />
        <div
          className="group flex bg-primary p-2 items-center gap-2 cursor-pointer rounded-full w-10 h-10 sm:hover:rotate-90 transition-all duration-300"
          onClick={() => {
            click.play();
            setOpen(!open);
          }}
          onMouseEnter={hover.play}
        >
          <div className="w-2 h-2 sm:group-hover:h-3 transition-all duration-300 bg-black rounded-full" />
          <div className="w-2 h-2 sm:group-hover:h-3 transition-all duration-300 bg-black rounded-full" />
        </div>
        <ul className="absolute flex flex-col gap-4 top-16 mt-6 right-0 text-black bg-transparent rounded-xl p-4">
          <motion.li
            className="overflow-hidden bg-primary rounded-full"
            onClick={click.play}
            onMouseEnter={hover.play}
          >
            <Link className="py-2 px-4 block" to={"/"}>
              Презентация
            </Link>
          </motion.li>
          {isLoggedIn ? (
            <>
              <motion.li
                className="overflow-hidden bg-primary rounded-full"
                onClick={click.play}
                onMouseEnter={hover.play}
              >
                <Link className="py-2 px-4 block" to={"/signup"}>
                  Зарегистрироваться
                </Link>
              </motion.li>
              <motion.li
                className="overflow-hidden bg-primary rounded-full"
                onClick={click.play}
                onMouseEnter={hover.play}
              >
                <Link className="py-2 px-4 block" to={"/login"}>
                  Войти
                </Link>
              </motion.li>
            </>
          ) : (
            <>
              <motion.li
                className="overflow-hidden bg-primary rounded-full"
                onClick={click.play}
                onMouseEnter={hover.play}
              >
                <Link className="py-2 px-4 block" to={"/chat/"}>
                  Чаты
                </Link>
              </motion.li>
              <motion.li
                className="overflow-hidden bg-primary rounded-full"
                onClick={click.play}
                onMouseEnter={hover.play}
              >
                <Link to={"/"}>Выйти</Link>
              </motion.li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default HeaderComponent;
