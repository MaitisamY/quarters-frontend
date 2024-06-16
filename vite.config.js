import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Specify the output directory for the build
    assetsDir: '.', // Assets directory relative to the output directory
    sourcemap: false, // Disable source maps for production
    // other build options...
  }
});