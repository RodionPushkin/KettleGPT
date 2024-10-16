import "./index.css";

// import { GPU } from "gpu.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app/App.tsx";

async function loadWasm() {
  const wasmModule = await WebAssembly.instantiateStreaming(
    fetch("/wasm/module.wasm"),
  );
  const { add } = wasmModule.instance.exports as any;
  console.log(add(5, 3)); // Вывод: 8
}

loadWasm().catch(console.error);

const setScreenHeight = () => {
  const vh: number = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  document.documentElement.style.setProperty("--wh", `${window.innerHeight}px`);
};
// window.addEventListener("resize", setScreenHeight);
window.addEventListener("load", setScreenHeight);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
