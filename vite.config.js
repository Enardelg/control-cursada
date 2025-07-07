import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/facturacion-ada/", // 👈 cambia por tu repo
});
