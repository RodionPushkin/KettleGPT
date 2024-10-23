import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import arrowUp from "/arrow-up.svg";
import copy from "/copy.svg";
import edit from "/edit-2.svg";
import mic from "/mic.svg";
import paperclip from "/paperclip.svg";
import volume from "/volume-2.svg";

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
  const [isRecording, setIsRecording] = useState(false);
  const endRecording = () => {
    console.log("!recording");

    setIsRecording(false);
  };
  const startRecording = () => {
    setIsRecording(true);
    console.log("recording");
  };
  return (
    <div
      className="cursor-pointer p-2 rounded-full"
      onClick={click.play}
      onMouseEnter={hover.play}
    >
      {textarea?.value.trim().length === 0 || isRecording ? (
        <div
          onMouseDown={startRecording}
          onMouseUp={endRecording}
          onTouchStart={startRecording}
          onTouchCancel={endRecording}
        >
          <img src={mic} className="pointer-events-none" />
        </div>
      ) : (
        <div>
          <img src={arrowUp} className="pointer-events-none" />
        </div>
      )}
    </div>
  );
};
const ChatComponent: React.FC<{ preview?: boolean; idChat?: string }> = ({
  preview,
  idChat,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const previewContext = [
    [
      {
        id: 1,
        message: "Как мне написать hello world?",
        type: true,
      },
      {
        id: 2,
        message: "я не знаю(",
        type: false,
        new: true,
      },
    ],
  ];
  const question: string = [
    "Что вас случилось?",
    "Чайник это круто",
    "Я кстати питонист",
    "Я не программирую на HTML",
    "Почему змея никогда не пишет код на Java?",
    "Что делает питон, когда ему грустно?",
    "Как питон ненароком попадает в бесконечный цикл?",
    "Почему переменные любят кошек?",
    "Какой любимый фильм Пайтона?",
    "Почему в функции нельзя держать секреты?",
    "Что случилось, когда питон встретил Ruby?",
    "Как питон называет своего лучшего друга - компилятора?",
    "Зачем питону слайд-шоу?",
    "Какой любимый десерт у программистов на Python?",
    "Почему змея использует списки вместо сумки?",
    "Почему питон не говорит 'привет' людям?",
    "Как питон справляется с депрессией? Он вызывает `print()`!",
    "Почему питон не доверяет спискам?",
    "Что питон делает на вечеринке? Вызывает `throw`!",
    "Почему python никогда не забывает об обеденном перерыве? У него всегда есть `break`!",
    "Как питон предпочитает путешествовать? На 'Tuple'!",
    "Почему переменные в Python всегда веселые? Потому что они динамические!",
    "Какой любимый спорт у питонов? 'Import' и 'Export'!",
    "Почему в Python так легко учиться? У него нет `syntax` и `errors`!",
    "Как питается питон? С `Bytes`!",
    "Почему питон всегда побеждает в шахматы? У него есть алгоритмы!",
    "Говорят нейросеть строили на HTML, тихо! Только никому!",
    "Очень жду от вас сообщение!",
  ][Math.round(Math.random() * 28)];
  const chat = useRef([]);
  useEffect(() => {
    if (idChat) {
      console.log(idChat);
    }
  }, [idChat]);
  useEffect(() => {
    if (preview) {
      console.log(previewContext);
    }
  }, [preview]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    textarea.style.height = "1.5rem";
    if (textarea.scrollHeight != 24)
      textarea.style.height = `${Math.min(textarea.scrollHeight, 144)}px`;
    setMessage(event.target.value.slice(0, 10000));
  };

  return (
    <>
      <motion.div
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        className="flex h-0 flex-auto bg-transparent rounded-[2rem] p-4 opacity-0"
      >
        <div
          className={`mt-auto max-h-full flex flex-col w-full overflow-y-auto overflow-x-hidden rounded-[1rem] ${chat.current.length === 0 ? "place-items-center mb-auto rounded-[0]" : ""}`}
        >
          {chat.current.length === 0 ? (
            <div className="select-none text-xl">
              {question.split("").map((el, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: i / 10 + 2.4,
                  }}
                  key={i}
                >
                  {el}
                </motion.span>
              ))}
            </div>
          ) : (
            chat.current.map(
              (item: { message: string; type: boolean }, index) => (
                <motion.div
                  key={index}
                  className={`group pt-3 ${item.message.length < 100 ? "pb-4 pl-4 pr-14" : "pb-6 px-4"} mb-6 bg-black bg-opacity-90 rounded-[2rem] flex flex-col relative max-w-[90%] sm:max-w-[70%] ${item.type ? "ml-auto" : "mr-auto"}`}
                >
                  <div className="absolute flex gap-2 bottom-0 left-4 group-hover:translate-y-5 translate-y-5 sm:translate-y-0 transition-all duration-300">
                    {item.type ? (
                      <img
                        className="h-4 cursor-pointer select-none"
                        src={edit}
                      />
                    ) : (
                      <>
                        <img
                          className="h-4 cursor-pointer select-none"
                          src={volume}
                        />
                        <img
                          className="h-4 cursor-pointer select-none"
                          src={copy}
                        />
                      </>
                    )}
                  </div>
                  <div className="text-wrap break-words">{item.message}</div>
                  <div className="absolute right-4 bottom-2 text-transparent text-xs pointer-events-none select-none">
                    22:00
                  </div>
                </motion.div>
              ),
            )
          )}
        </div>
      </motion.div>
      <motion.label
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        htmlFor="message"
        className="flex flex-row items-center mt-6 pr-11 py-4 bg-primary rounded-[2rem] overflow-hidden relative opacity-0"
      >
        <div
          className={`absolute left-1 select-none ${preview ? "pointer-events-none" : ""}`}
        >
          <PinFile></PinFile>
        </div>
        <textarea
          ref={textareaRef}
          value={message}
          onInput={handleInput}
          id="message"
          maxLength={10000}
          disabled={preview}
          className="w-full h-6 pl-12 resize-none focus:outline-none text-black  placeholder-gray-500 border-none select-none"
          placeholder="Сообщить Kettle GPT"
        ></textarea>
        {textareaRef.current && textareaRef.current.value.length !== 0 ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-11 bottom-1 select-none text-xs text-black "
          >
            {textareaRef.current && textareaRef.current.value.length} / 10000
          </motion.span>
        ) : null}

        <div
          className={`absolute right-1 select-none ${preview ? "pointer-events-none" : ""}`}
        >
          <SendButton textarea={textareaRef.current}></SendButton>
        </div>
      </motion.label>
    </>
  );
};

export default ChatComponent;
