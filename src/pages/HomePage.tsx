import React, { useRef, useState } from "react";

// import { useSoundContext } from "../components/SoundProvider";

const HomePage: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const chat = [
    {
      id: 1,
      message: "Как мне написать hello world?",
      type: true,
    },
    //     {
    //       id: 2,
    //       message: `<h1>Шаг 1: Установка Python</h1>
    // <p>Если у вас еще не установлен Python, вам нужно скачать его. Перейдите на <a href="https://www.python.org/downloads/">официальный сайт Python</a> и скачайте актуальную версию для вашей операционной системы. Убедитесь, что при установке выбрана опция "Добавить Python в PATH".</p>

    // <h1>Шаг 2: Создание файла</h1>
    // <p>Теперь откройте текстовый редактор. Это может быть любой редактор: Notepad, Visual Studio Code, PyCharm и т.д. Создайте новый файл и назовите его <code>hello.py</code>. Расширение <code>.py</code> указывает на то, что это файл Python.</p>

    // <h1>Шаг 3: Написание кода</h1>
    // <p>В этом файле напишите следующий код:</p>
    // <code>print("Hello, World!")</code>

    // <h1>Шаг 4: Сохранение файла</h1>
    // <p>Сохраните файл после того, как напишете код.</p>

    // <h1>Шаг 5: Запуск программы</h1>
    // <p>Теперь откройте терминал или командную строку:</p>
    // <ol>
    //     <li>Перейдите в папку, где находится ваш файл <code>hello.py</code>. Используйте команду <code>cd</code> для навигации. Например:</li>
    //     <code>cd путь_к_вашей_папке</code>
    //     <li>Введите следующую команду, чтобы запустить свою программу:</li>
    //     <code>python hello.py</code>
    // </ol>

    // <h1>Ожидаемый результат</h1>
    // <p>После выполнения команды на экране должно появиться сообщение:</p>
    // <code>Hello, World!</code>

    // <h1>Заключение</h1>
    // <p>Поздравляю! Вы только что написали свою первую программу на Python. Эта программа очень простая, но является основой для изучения более сложного кода. Если у вас есть вопросы или вы хотите узнать больше, не стесняйтесь спрашивать!</p>`,
    //       type: false,
    //     },
  ];
  // const { click, hover, toggle, pageExit, pageEnter } = useSoundContext();

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    textarea.style.height = "1.5rem";
    if (textarea.scrollHeight != 24)
      textarea.style.height = `${Math.min(textarea.scrollHeight, 144)}px`;
    setValue(event.target.value);
  };
  return (
    <div className="pt-28 pb-6 px-6 xl:px-0 h-full min-h-mobile-screen flex flex-col max-w-screen-sm overflow-hidden">
      <div className="flex flex-col gap-6 h-full flex-auto overflow-x-auto">
        <div className="mt-auto">
          {chat.map((item, index) => (
            <div key={index}>
              <div>{item.message}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 py-4 flex flex-col bg-primary rounded-lg">
        <textarea
          ref={textareaRef}
          value={value}
          onInput={handleInput}
          className="w-full h-6 px-12 resize-none focus:outline-none text-black  placeholder-gray-500 border-none"
          placeholder="Сообщить Kettle GPT"
        ></textarea>
      </div>
    </div>
  );
};
export default HomePage;
