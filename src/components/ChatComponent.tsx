import React, { useRef } from "react";

import arrowUp from "/arrow-up.svg";
import paperclip from "/paperclip.svg";

import { useSoundContext } from "./SoundProvider";

const ChatComponent: React.FC = () => {
  const { hover } = useSoundContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messageValue = useRef("");
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
    textarea.style.height = "2.5rem";
    if (textarea.scrollHeight != 48)
      textarea.style.height = `${Math.min(textarea.scrollHeight, 144)}px`;
    messageValue.current = event.target.value;
  };
  const PinFile: React.FC = () => {
    console.log("PinFile");
    return (
      <div
        className="cursor-pointer"
        onClick={() => console.log("dada")}
        onMouseEnter={hover.play}
      >
        <img src={paperclip} alt="+" />
      </div>
    );
  };

  const SendButton: React.FC = () => {
    console.log("SendButton");
    // const isTextAreaMultiline = () => {
    //   if (textareaRef.current) return textareaRef.current.scrollHeight > 56;
    //   return false;
    // };
    return (
      <div
        // className={`cursor-pointer ${isTextAreaMultiline() ? "mr-2" : "mr-0"}`}
        onClick={() => console.log("dada")}
        onMouseEnter={hover.play}
      >
        <img src={arrowUp} alt="send" />
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-6 h-full flex-auto overflow-x-auto">
        <div className="mt-auto">
          {chat.map((item, index) => (
            <div key={index}>
              <div>{item.message}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center mt-6 bg-primary rounded-lg overflow-hidden relative">
        <div className="absolute left-3">
          <PinFile></PinFile>
        </div>
        <textarea
          ref={textareaRef}
          value={messageValue.current}
          onInput={handleInput}
          className="w-full h-14 px-12 py-4 resize-none focus:outline-none text-black  placeholder-gray-500 border-none"
          placeholder="Сообщить Kettle GPT"
        ></textarea>
        <div className="absolute right-4">
          <SendButton></SendButton>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
