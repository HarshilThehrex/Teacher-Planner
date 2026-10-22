import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps asset paths relative (works on Vercel and static hosts)
export default defineConfig({ base: './', plugins: [react()] })
