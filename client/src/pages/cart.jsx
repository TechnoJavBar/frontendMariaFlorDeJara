import CartItem from "../components/cartItem";
import {useCart} from "../context/CartContext.jsx";
import "./cart.css";

export function CartPage() {
  const { cart, updateQuantity, removeItem, clearCart, subtotal, totalItems, sendWhatsappCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1>Tu Carrito</h1>
        <p>El carrito está vacío. ¡Vuelve a la tienda para elegir algo!</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Tu Carrito ({totalItems})</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>

        <div className="cart-summary">
          <h2>Resumen</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>
          <button onClick={sendWhatsappCart} className="btn-checkout">Finalizar Compra</button>
          <button onClick={clearCart} className="btn-clear-all">
            Vaciar Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
