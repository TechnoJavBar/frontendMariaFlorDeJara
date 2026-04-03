import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoutes.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import { AdminRoute } from "./adminRoutes.jsx";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { ProductsPage } from "./pages/productsPage";
import { IndexPage } from "./pages/Index";
import { ProductsView } from "./pages/productsView";
import { ContactUs } from "./pages/contactUs";
import { TermsAndConditionsPage } from "./pages/termsAndConditionsPage";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Perfil } from "./pages/Perfil";
import {ProductForm} from "./pages/productsForm.jsx";
import {AdminProductList} from "./pages/adminProductList.jsx";
import "./App.css";
import { CartPage } from "./pages/cart.jsx";

function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <div className="App container-fluid w-100 p-0">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/Inicio" />} />
          <Route path="/Inicio" element={<IndexPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductsView />} />
          <Route path="/contacto" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
          <Route
            path="/TermsAndConditions"
            element={<TermsAndConditionsPage />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/perfil" element={<Perfil />} />
            {/* Aquí puedes añadir más: /carrito, /configuracion, etc. */}
            <Route path="/cart" element={<CartPage/>}/>
          </Route>

          <Route element={<AdminRoute/>}>
            <Route path="/admin/productos" element={<AdminProductList/>}/>
            <Route path="/admin/productos/nuevo" element={<ProductForm/>}/>
            <Route path="/admin/productos/editar/:id" element={<ProductForm/>}/>
          </Route>
          

          
        </Routes>
        <Footer />
      </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
