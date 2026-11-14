import { fileURLToPath } from "node:url";

// どのディレクトリから起動しても tailwind.config.js を見つけられるよう絶対パスで指定する
export default {
  plugins: {
    tailwindcss: { config: fileURLToPath(new URL("./tailwind.config.js", import.meta.url)) },
    autoprefixer: {},
  },
};
