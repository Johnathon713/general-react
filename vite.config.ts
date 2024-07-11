import {ConfigEnv, defineConfig, loadEnv, UserConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({mode, command}: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [react()], server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://localhost:9528', changeOrigin: true
        }
      }
    }
  }
})
