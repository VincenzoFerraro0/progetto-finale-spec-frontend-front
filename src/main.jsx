import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext.jsx'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    // AVVOLGO TUTTO CON BrowserRouter PER USARE useNavigate nel globalContext
    <BrowserRouter>
        <GlobalProvider>
            <App />
        </GlobalProvider>
    </BrowserRouter>

)
