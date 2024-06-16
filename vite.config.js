import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.NODE_ENV === 'production' ? 8080 : (process.env.VITE_PORT || 5173),
    // other server options...
  }
});