import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartKey = user ? `cart_user_${user.email}` : "cart_guest";
    const savedCart = localStorage.getItem(cartKey);

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      setCart([]); // Si el usuario no tiene carrito guardado, empezamos vacío
    }
  }, [user]);

  // Guardar cada vez que el carrito cambie
  useEffect(() => {
    const cartKey = user ? `cart_user_${user.email}` : "cart_guest";
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, user]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad: qty } : item)),
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );

  const sendWhatsappCart = () => {
    const telefono = "34627348747"
    // const telefono = "34698905117";

    try {
      if (cart.length === 0) {
        alert("No hay productos en el carrito");
        return;
      }

      let message = `¡Hola *Mariaflodejara*!\n`;
      message += `Este es mi pedido desde la web:\n\n`;

      cart.map((item, index) => {
        const total = item.precio * item.cantidad;
        message += `${index + 1}. *${item.nombre}* (Cant: ${item.cantidad}) - ${total.toFixed(2)}€\n`;
      });

      message += `\nTotal: ${subtotal.toFixed(2)}€`;
      message += `\n\n¿Cómo puedo coordinar el pago?`;

      const url = `https://wa.me/${telefono}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error al leer el carrito: ", error);
      alert("Hubo un error al procesar el carrito");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        subtotal,
        sendWhatsappCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito fácilmente
export const useCart = () => useContext(CartContext);
