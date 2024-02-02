import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// vue.config.js
module.exports = {
  transpileDependencies:['@dcloudio/uni-ui']
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
});
