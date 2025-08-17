import { useParams } from 'react-router-dom';
import { getProductById } from '../api/products.api';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './productsView.css';

export function ProductsView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    async function findProduct() {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
        setMainImage(res.data.img1); // Imagen principal por defecto
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    }

    findProduct();
  }, [id]);

  if (!product) return <p>Cargando producto...</p>;

  const galleryImages = [product.img1, product.img2, product.img3].filter(Boolean);

  return (
    <motion.div
      className="product-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="product-container">
        <div className="product-column image-column">
          <img src={mainImage} alt={product.name} className="product-image-view" />
          <div className="image-gallery">
            {galleryImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Vista ${index + 1}`}
                className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="product-column details-column">
          
        </div>

        <div className="product-column buy-column">
          <div className="buy-box">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price} €</p>
            <p className="product-stock">Stock: {product.stock}</p>
            <button className="buy-button">Comprar ahora</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
