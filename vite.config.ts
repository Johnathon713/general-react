import {ConfigEnv, defineConfig, loadEnv, UserConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

export default defineConfig(({mode, command}: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [react()], server: {
      host: true,
      port: 5173,
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://localhost:9528', changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, './src')
      }
    },
  }
})
