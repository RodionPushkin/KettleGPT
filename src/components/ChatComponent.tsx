import React, { useRef, useState } from "react";

import arrowUp from "/arrow-up.svg";
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
      <div className="flex flex-col gap-6 h-full flex-auto overflow-x-auto">
        <div className="mt-auto bg-transparent">
          {chat.map((item, index) => (
            <div key={index}>
              <div>{item.message}</div>
            </div>
          ))}
        </div>
      </div>
      <label
        htmlFor="message"
        className="flex flex-row items-center mt-6 pr-11 py-4 bg-primary rounded-[2rem] overflow-hidden relative"
      >
        <div className="absolute left-1">
          <PinFile></PinFile>
        </div>
        <textarea
          ref={textareaRef}
          value={message}
          onInput={handleInput}
          id="message"
          className="w-full h-6 pl-12 resize-none focus:outline-none text-black  placeholder-gray-500 border-none"
          placeholder="Сообщить Kettle GPT"
        ></textarea>
        <div className="absolute right-1">
          <SendButton textarea={textareaRef.current}></SendButton>
        </div>
      </label>
    </>
  );
};

export default ChatComponent;
