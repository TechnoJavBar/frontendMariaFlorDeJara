import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { ProductsPage } from './pages/productsPage'
import { IndexPage } from './pages/Index'
import { ProductsView } from './pages/productsView'
import { ContactUs } from './pages/contactUs'
import {TermsAndConditionsPage} from './pages/termsAndConditionsPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App container-fluid w-100 p-0">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/Inicio" />} />
          <Route path="/Inicio" element={<IndexPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductsView />} />
          <Route path="/contacto" element={<ContactUs />} />
          <Route path="/TermsAndConditions" element={<TermsAndConditionsPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App