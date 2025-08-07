import './productCard.css'
import {Link} from 'react-router-dom';
import { Button } from '../components/button';


export function ProductCard({product}){
    return (
        <div className="productCard">
            <img src={product.img1} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}€</p>
            {/* <p className="product-description">{product.description}</p> */}
            <Link to={`/product/${product.id}`}>
                <Button text="Ver detalles" />
            </Link>
        </div>
    )
}