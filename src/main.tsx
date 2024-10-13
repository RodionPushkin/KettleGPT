import "./index.css";

import { GPU } from "gpu.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app/App.tsx";

const gpu = new GPU();

const add = gpu
  .createKernel(function (a: number, b: number): number {
    return a + b;
  })
  .setOutput([1]);

const result: number[] = add(1, 2) as number[];
console.log(result[0]);
async function loadWasm() {
  const wasmModule = await WebAssembly.instantiateStreaming(
    fetch("/wasm/module.wasm"),
  );
  const { add } = wasmModule.instance.exports as any;
  console.log(add(5, 3)); // Вывод: 8
}

loadWasm().catch(console.error);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
