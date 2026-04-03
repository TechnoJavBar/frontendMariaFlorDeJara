import { createContext, useState, useEffect, useContext } from "react";
import {useAuth} from "./AuthContext.jsx";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  const {user} = useAuth();
  const [cart, setCart] = useState([]);
    
    useEffect(() => {
    const cartKey = user ? `cart_user_${user.email}` : 'cart_guest';
    const savedCart = localStorage.getItem(cartKey);
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      setCart([]); // Si el usuario no tiene carrito guardado, empezamos vacío
    }
  }, [user]);

  // Guardar cada vez que el carrito cambie
  useEffect(() => {
    const cartKey = user ? `cart_user_${user.email}` : 'cart_guest';
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, user]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, cantidad: qty } : item)));
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, updateQuantity, removeItem, clearCart, totalItems, subtotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito fácilmente
export const useCart = () => useContext(CartContext);