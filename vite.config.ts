import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
// @ts-ignore
import eslintPlugin from "vite-plugin-eslint";
import fs from "fs";
import path from "path";

const cert = fs.readFileSync(path.resolve(__dirname, "localhost.pem"));
const key = fs.readFileSync(path.resolve(__dirname, "localhost-key.pem"));
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      fix: true,
    }),
  ],
  server: {
    port: 8080,
    https: {
      cert,
      key,
    },
  },
});