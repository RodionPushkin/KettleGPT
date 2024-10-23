import react from "@vitejs/plugin-react-swc";
// @ts-ignore
// import fs from "fs";
// @ts-ignore
// import path from "path";
import { defineConfig } from "vite";
// @ts-ignore
import eslintPlugin from "vite-plugin-eslint";
// @ts-ignore

// const cert = fs.readFileSync(path.resolve(__dirname, "localhost.pem"));
// @ts-ignore

// const key = fs.readFileSync(path.resolve(__dirname, "localhost-key.pem"));
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      fix: true,
    }),
  ],
  server: {
    port: 443,
    // https: {
    //   cert,
    //   key,
    // },
  },
});

// export default defineConfig({
//   plugins: [react()],
// });
