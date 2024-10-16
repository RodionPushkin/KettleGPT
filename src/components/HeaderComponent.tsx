import { motion, stagger, useAnimate } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import arrowRight from "/arrow-right.svg";
import logo from "/favicon.svg";
import film from "/film.svg";
import login from "/log-in.svg";
import logout from "/log-out.svg";
import message from "/message-circle.svg";

import MuteButton from "./MuteButton";
import { useSoundContext } from "./SoundProvider";

const HeaderComponent: React.FC = () => {
  const { click, hover } = useSoundContext();
  const isOpen = useRef(false);

  const [scope, animate] = useAnimate();
  const staggerList = stagger(0.1, { startDelay: 0.25 });
  const isLoggedIn = useRef(true);
  useEffect(() => {
    animate(
      "ul",
      {
        width: isOpen.current ? "16rem" : 0,
        height: isOpen.current ? "11.5rem" : 0,
        opacity: isOpen.current ? 1 : 0,
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.4,
      },
    );
    animate(
      "li",
      isOpen.current
        ? { opacity: 1, scale: 1, x: 0 }
        : { opacity: 0, scale: 0.3, x: -50 },
      {
        duration: 0.2,
        delay: isOpen.current ? staggerList : 0,
      },
    );
  }, [isOpen.current, isOpen]);
  useEffect(() => {
    if (isOpen.current)
      setTimeout(() => {
        isOpen.current = false;
      }, 10);
  }, []);
  return (
    <motion.header
      animate={{
        top: "1.5rem",
        paddingTop: 0,
        height: "unset",
        transition: {
          ease: "easeOut",
          duration: 0.3,
          delay: 2.2,
        },
      }}
      className="fixed top-0 left-0 h-screen items-center flex justify-center w-screen z-[9999] px-4 select-none"
      ref={scope}
    >
      <motion.div
        animate={{
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.16)",
          transition: {
            ease: "easeOut",
            duration: 0.4,
            delay: 1.8,
          },
        }}
        className="flex h-16 gap-4 w-72 sm:w-96 items-center rounded-[2rem] pl-6 pr-3 relative max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl"
      >
        <Link
          onClick={() => {
            click.play();
            isOpen.current = false;
          }}
          onMouseEnter={hover.play}
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
        <motion.div
          animate={{
            display: "flex",
            transition: {
              ease: "easeOut",
              delay: 1.9,
            },
          }}
          className="group hidden bg-primary p-2 items-center gap-2 cursor-pointer rounded-full w-10 h-10 sm:hover:rotate-90 transition-all duration-300"
          onClick={() => {
            click.play();
            isOpen.current = !isOpen.current;
          }}
          onMouseEnter={hover.play}
        >
          <div className="w-2 h-2 sm:group-hover:h-3 transition-all duration-300 bg-black rounded-full" />
          <div className="w-2 h-2 sm:group-hover:h-3 transition-all duration-300 bg-black rounded-full" />
        </motion.div>
        <motion.ul
          animate={{
            display: "flex",
            opacity: 1,
            transition: {
              ease: "easeOut",
              delay: 1.8,
            },
          }}
          className="absolute hidden flex-col gap-4 top-16 mt-6 right-0 text-black bg-transparent rounded-[2rem] p-4 opacity-0"
        >
          <motion.li
            className="overflow-hidden bg-primary rounded-full"
            onClick={() => {
              click.play();
              isOpen.current = !isOpen.current;
            }}
            onMouseEnter={hover.play}
          >
            <Link className="group py-2 px-4 flex gap-2" to={"/presentation"}>
              <img
                className="-translate-x-10 group-hover:translate-x-0 group-hover:w-4 transition-all duration-300 w-0"
                src={film}
              />
              Презентация
            </Link>
          </motion.li>
          {isLoggedIn ? (
            <>
              <motion.li
                className="overflow-hidden bg-primary rounded-full"
                onClick={() => {
                  click.play();
                  isOpen.current = !isOpen.current;
                }}
                onMouseEnter={hover.play}
              >
                <Link className="group py-2 px-4 flex gap-2" to={"/sign/up"}>
                  <img
                    className="-translate-x-10 group-hover:translate-x-0 group-hover:w-4 transition-all duration-300 w-0"
                    src={arrowRight}
                  />
                  Зарегистрироваться
                </Link>
              </motion.li>
              <motion.li
                className="overflow-hidden bg-primary rounded-full"
                onClick={() => {
                  click.play();
                  isOpen.current = !isOpen.current;
                }}
                onMouseEnter={hover.play}
              >
                <Link className="group py-2 px-4 flex gap-2" to={"/sign/in"}>
                  <img
                    className="-translate-x-10 group-hover:translate-x-0 group-hover:w-4 transition-all duration-300 w-0"
                    src={login}
                  />
                  Войти
                </Link>
              </motion.li>
            </>
          ) : (
            <>
              <motion.li
                className="overflow-hidden bg-primary rounded-full"
                onClick={() => {
                  click.play();
                  isOpen.current = !isOpen.current;
                }}
                onMouseEnter={hover.play}
              >
                <Link className="group py-2 px-4 flex gap-2" to={"/chat/"}>
                  <img
                    className="-translate-x-10 group-hover:translate-x-0 group-hover:w-4 transition-all duration-300 w-0"
                    src={message}
                  />
                  Чаты
                </Link>
              </motion.li>
              <motion.li
                className="overflow-hidden bg-primary rounded-full"
                onClick={() => {
                  click.play();
                  isOpen.current = !isOpen.current;
                }}
                onMouseEnter={hover.play}
              >
                <Link className="group py-2 px-4 flex gap-2" to={"/"}>
                  <img
                    className="-translate-x-10 group-hover:translate-x-0 group-hover:w-4 transition-all duration-300 w-0"
                    src={logout}
                  />
                  Выйти
                </Link>
              </motion.li>
            </>
          )}
        </motion.ul>
      </motion.div>
    </motion.header>
  );
};

export default HeaderComponent;
