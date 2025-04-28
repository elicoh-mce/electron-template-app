import { defineConfig, defineViteConfig, loadEnv } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    build: {
      outDir: 'build',
      emptyOutDir: true,
    },
  },
  preload: {
    build: {
      outDir: 'build/preload',
      emptyOutDir: true,
    },
  },
  renderer: defineViteConfig(({ command, mode }) => {
    const env = loadEnv(mode);
    console.log(env.SOME_VAR, mode);
    if (command === 'serve') {
      return {
        server: {
          port: 3000,
        },
      }
    } else {
      return {
        plugins: [react()],
        build: {
          outDir: 'build/renderer',
          emptyOutDir: true,
          rollupOptions: {
            input: {
              main: 'src/renderer/index.html',
            },
            output: {
              manualChunks: {
                react: ['react', 'react-dom'],
              },
            },
          },
        },
      }
    }
  })
})

