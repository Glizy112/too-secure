import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import './index.css'
import App from './App.jsx'
import { initializeCsrf } from "./api/axios";

async function bootstrap() {
  await initializeCsrf();

  createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  )
}

bootstrap();