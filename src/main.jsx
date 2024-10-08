import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <PrimeReactProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </PrimeReactProvider>

)
