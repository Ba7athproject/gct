import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // IMPORTANT : Sur Vercel, le site est à la racine, donc base doit être '/'
  base: '/', 
  build: {
    // Vercel préfère 'dist' par défaut, mais 'docs' peut fonctionner. 
    // Je te conseille de remettre 'dist' qui est le standard Vite.
    outDir: 'dist',
  },
})