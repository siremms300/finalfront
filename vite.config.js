import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Vite's default port
    proxy: {
      '/api/v1': {
        target: 'http://localhost:3000', // Your backend server
        changeOrigin: true,
        
      }
    }
  }
})
















// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true, // Allow access over the network
//     port: 5173 // Default Vite port
//   }
// })
