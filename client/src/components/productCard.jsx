import "./productCard.css";
import { Link } from "react-router-dom";
import { Button } from "../components/button";

export function ProductCard({ product }) {
  return (
    <section className="card-container">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi8zA7z5s9ZpLjLCAAw0VoruQUTG-lFtDqKA&s"
        alt={product.nombre}
        className="card-image"
      />
      <div className="card-info">
        <h3 className="card-title">{product.nombre}</h3>
        <p className="card-descripcion">{product.descripcion}</p>
        <div class="card-footer">
          <span class="card-price">Precio: {product.precio}€</span>
          <Link to={`/products/${product.code}`}>Ver producto</Link>
        </div>
      </div>
    </section>
  );
}
