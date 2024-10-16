import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

import arrowUp from "/arrow-up.svg";
import edit from "/edit-2.svg";
import paperclip from "/paperclip.svg";

import { useSoundContext } from "./SoundProvider";

const PinFile: React.FC = () => {
  const { click, hover } = useSoundContext();
  return (
    <div
      className="cursor-pointer p-2 rounded-full"
      onClick={click.play}
      onMouseEnter={hover.play}
    >
      <img src={paperclip} alt="+" />
    </div>
  );
};

const SendButton: React.FC<{ textarea: HTMLTextAreaElement | null }> = ({
  textarea,
}) => {
  const { click, hover } = useSoundContext();
  console.log(textarea);

  return (
    <div
      className="cursor-pointer p-2 rounded-full"
      onClick={click.play}
      onMouseEnter={hover.play}
    >
      <img src={arrowUp} alt="send" />
    </div>
  );
};
const ChatComponent: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const chat = [
    {
      id: 1,
      message: "Как мне написать hello world?",
      type: true,
    },
    {
      id: 2,
      message: "я не знаю(",
      type: false,
    },
  ];

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    textarea.style.height = "1.5rem";
    if (textarea.scrollHeight != 24)
      textarea.style.height = `${Math.min(textarea.scrollHeight, 144)}px`;
    setMessage(event.target.value);
  };

  return (
    <>
      <div className="flex h-0 flex-auto bg-transparent rounded-[2rem] sm:p-4 p-4 pr-0">
        <div className="mt-auto max-h-full flex flex-col w-full overflow-y-auto overflow-x-hidden rounded-[1rem]">
          {chat.map((item, index) => (
            <motion.div
              key={index}
              className={`group pt-3 ${item.message.length < 100 ? "pb-4 pl-4 pr-14" : "pb-6 px-4"} mt-4 bg-black bg-opacity-90 rounded-[2rem] flex flex-col relative max-w-[90%] sm:max-w-[70%] ${item.type ? "ml-auto" : "mr-auto"}`}
            >
              {item.type ? (
                <>
                  <div className="h-10 -translate-x-14 pointer-events-none group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-1 absolute bottom-1 -left-12 p-2 rounded-full bg-primary cursor-pointer transition-all duration-300">
                    <img src={edit} />
                  </div>
                </>
              ) : (
                <></>
              )}
              <div className="text-wrap break-words">{item.message}</div>
              <div className="absolute right-4 bottom-2 text-transparent text-xs pointer-events-none select-none">
                22:00
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <label
        htmlFor="message"
        className="flex flex-row items-center mt-6 pr-11 py-4 bg-primary rounded-[2rem] overflow-hidden relative"
      >
        <div className="absolute left-1 select-none">
          <PinFile></PinFile>
        </div>
        <textarea
          ref={textareaRef}
          value={message}
          onInput={handleInput}
          id="message"
          className="w-full h-6 pl-12 resize-none focus:outline-none text-black  placeholder-gray-500 border-none select-none"
          placeholder="Сообщить Kettle GPT"
        ></textarea>
        <div className="absolute right-1 select-none">
          <SendButton textarea={textareaRef.current}></SendButton>
        </div>
      </label>
    </>
  );
};

export default ChatComponent;
