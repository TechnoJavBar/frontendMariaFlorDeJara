import React from 'react';
import "./cartItem.css";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="cart-item">
      <img src={item.imagenes[0]} alt={item.nombre} />
      
      <div className="item-info">
        <h3>{item.nombre}</h3>
        <p className="item-price">{item.precio}€</p>
      </div>

      <div className="item-controls">
        <button 
          onClick={() => updateQuantity(item.id, item.cantidad - 1)}
          disabled={item.cantidad <= 1}
        >
          -
        </button>
        <span className="qty-number">{item.cantidad}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.cantidad + 1)}
        >
          +
        </button>
      </div>

      <div className="item-actions">
        <p className="item-subtotal">{(item.precio * item.cantidad).toFixed(2)}€</p>
        <button className="btn-remove" onClick={() => removeItem(item.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;