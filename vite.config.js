import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

export default defineConfig({
  plugins: [
    vue(),
    basicSsl(),
    tailwindcss(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ]
});
