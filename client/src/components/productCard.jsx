import './productCard.css'
import {Link} from 'react-router-dom';
import { Button } from '../components/button';


export function ProductCard({product}){
   return (
    <div className="card h-100 shadow-sm border-0 product-card">
      <img
        src={product.img1}
        alt={product.name}
        className="card-img-top product-image"
        style={{ objectFit: "cover", height: "250px" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.name}</h5>
        <p className="card-text fw-bold">{product.price}€</p>
        <Link to={`/product/${product.id}`} className="mt-auto">
          <Button text="Ver detalles" />
        </Link>
      </div>
      <style jsx>{`
        .product-card {
          transition: transform 0.3s, box-shadow 0.3s;
          border-radius: 12px;
          overflow: hidden;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .product-image {
          width: 100%;
          border-bottom: 1px solid #eee;
        }
        .card-title {
          margin-bottom: 0.5rem;
        }
        .card-text {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}