// importamos la configuracion de vite y el plugin de react
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'

//exportamos por defecto el defineConfig y en plugins usamos react
export default defineConfig({
    plugins: [react()]
})