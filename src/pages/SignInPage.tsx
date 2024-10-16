import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";

import login from "/log-in.svg";

import { useSoundContext } from "../components/SoundProvider";
const SignInPage: React.FC = () => {
  const { click, hover } = useSoundContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <motion.div
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      className="w-full pb-20 mt-auto opacity-0"
    >
      <h2 className="text-2xl sm:text-3xl md:text-5xl mb-4 font-bold">
        Войти в&nbsp;Kettle&nbsp;GPT
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2">Почта</label>
          <input
            type="email"
            onClick={click.play}
            onMouseEnter={hover.play}
            {...register("email", {
              required: "Почта обязательная",
              maxLength: { value: 50, message: "Максимум 50 символов" },
            })}
            autoComplete="on"
            className={`outline-none text-black w-full px-4 py-2 border ${errors.email ? "border-secondary" : "none"} rounded-[2rem]`}
          />
          {errors.email && (
            <p className="text-secondary text-sm pt-1">
              {errors.email?.message as string}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Пароль</label>
          <input
            type="password"
            onClick={click.play}
            onMouseEnter={hover.play}
            {...register("password", {
              required: "Пароль обязательный",
              minLength: { value: 6, message: "Минимум 6 символов" },
              maxLength: { value: 20, message: "Максимум 20 символов" },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                message:
                  "Пароль должен содержать буквы и хотя бы одну цифру и не должен содержать спецсимволов",
              },
            })}
            autoComplete="on"
            className={`outline-none text-black w-full px-4 py-2 border ${errors.password ? "border-secondary" : "none"} rounded-[2rem]`}
          />
          {errors.password && (
            <p className="text-secondary text-sm pt-1">
              {errors.password?.message as string}
            </p>
          )}
        </div>

        <button
          type="submit"
          onClick={click.play}
          onMouseEnter={hover.play}
          className="group w-full bg-primary py-2 text-black rounded-full flex gap-2 items-center justify-center"
        >
          <img
            className="-translate-x-10 group-hover:translate-x-0 group-hover:w-4 transition-all duration-300 w-0 pointer-events-none"
            src={login}
          />
          Войти
        </button>
      </form>
    </motion.div>
  );
};
export default SignInPage;
