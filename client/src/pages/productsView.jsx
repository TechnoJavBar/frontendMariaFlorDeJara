import { useParams } from "react-router-dom";
import { getProductById } from "../api/products.api";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {useCart} from "../context/CartContext.jsx";
import EmptyProducts from "../components/emptyProducts.jsx";

import logo from "../assets/logoMariaflordejara.jpg";
import "./productsView.css";

export function ProductsView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const {addToCart} = useCart();

  useEffect(() => {
    async function findProduct() {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
        //TODO: establecer como imagen predeterminada product.imagenes[0] ya que es la primera
        if(res.data.imagenes){
          setMainImage(res.data.imagenes[0]);
        }
        else{
          setMainImage(logo);
        }
        
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        return <EmptyProducts />;
      }
    }

    findProduct();
  }, [id]);

  //TODO: agregar un loader spinner
  if (!product) return <p>SPINNER</p>;


  return (
    <motion.div
      className="product-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
        {/* Columna de imágenes a la izquierda */}
        <div className="container-images">
          <img
            src={mainImage}
            alt={product.nombre}
            className="main-image"
          />
          {product?.imagenes?.length > 0 ?
          <div className="gallery-images">
            {product.imagenes.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Vista ${index + 1}`}
                className={`img-thumbnail ${
                  mainImage === img ? "border-primary" : ""
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        :
        <>
        </>  
        }
          
        </div>

        {/* Columna de información pegada a la derecha */}
        <div className="container-information">
          <h1 className="container-information-h1">{product.nombre}</h1>
          <p className="container-information-descripcion">{product.descripcion}</p>
          <p className="container-information-precio">{product.precio} </p>
          <p
            className={`${
              product.stock > 0 ? "texto-true" : "texto-false"
            }`}
          >
            {product.stock > 0 ? `Stock: ${product.stock} uds` : "Agotado"}
          </p>
          <button
            className="container-information-button"
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
          >
            {product.stock > 0 ? "Añadir al carrito" : "No disponible"}
          </button>
        </div>
    </motion.div>
  );
}
