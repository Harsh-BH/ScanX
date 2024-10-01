import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppKitProvider } from './Contexts/AppKitProvider.jsx';

createRoot(document.getElementById('root')).render(

  <AppKitProvider>
  <StrictMode>
  <main className="dark text-foreground bg-background">
    <App />
    </main>
  </StrictMode>
</AppKitProvider>

)
