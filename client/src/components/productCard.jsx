import "./productCard.css";
import { Link } from "react-router-dom";

export function ProductCard({ product }) {
  return (
    <section className="card-container">
      {/* TODO: añadir en src {product.images[0]} ya que será la principal */}
      <img
        src={product?.imagenes?.length > 0 ? product.imagenes[0] : "../assets/logoMariaflordejara.jpg"}
        alt={product.nombre}
        className="card-image"
      />
      <div className="card-info">
        <h3 className="card-title">{product.nombre}</h3>
        <p className="card-descripcion">{product.descripcion}</p>
        <div class="card-footer">
          <span class="card-price">Precio: {product.precio}€</span>
          <Link to={`/products/${product.id}`}>Ver producto</Link>
        </div>
      </div>
    </section>
  );
}
