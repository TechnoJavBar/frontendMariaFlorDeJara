import { getAllProducts } from "../api/products.api"
import { useEffect, useState } from "react"
import { ProductCard } from "./productCard"
import './productsList.css'

export function ProductsList(){

    const [products, setProducts] = useState([])

    useEffect(() => {

        async function loadProducts(){
                const res = await getAllProducts();
                setProducts(res.data);
        }

        loadProducts();

    },[])
    return (
        <div className="productsList">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}