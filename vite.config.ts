import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
// @ts-ignore
import eslintPlugin from "vite-plugin-eslint";
// @ts-ignore
// import fs from "fs";
// // @ts-ignore
// import path from "path";
// @ts-ignore
// const cert = fs.readFileSync(path.resolve(__dirname, "localhost.pem"));
// // @ts-ignore
// const key = fs.readFileSync(path.resolve(__dirname, "localhost-key.pem"));
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      fix: true,
    }),
  ],
  server: {
    port: 80,
    // https: {
    //   cert,
    //   key,
    // },
  },
  preview: {
    port: 80,
  },
});
