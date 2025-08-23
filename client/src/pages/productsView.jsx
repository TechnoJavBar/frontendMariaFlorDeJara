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

  // return (
  //   <motion.div
  //     className="product-page container-fluid"
  //     initial={{ opacity: 0 }}
  //     animate={{ opacity: 1 }}
  //     transition={{ duration: 0.4 }}
  //   >
  //     <div className="product-container">
  //       <div className="product-column image-column">
  //         <img src={mainImage} alt={product.name} className="product-image-view" />
  //         <div className="image-gallery">
  //           {galleryImages.map((img, index) => (
  //             <img
  //               key={index}
  //               src={img}
  //               alt={`Vista ${index + 1}`}
  //               className={`thumbnail ${mainImage === img ? 'active' : ''}`}
  //               onClick={() => setMainImage(img)}
  //             />
  //           ))}
  //         </div>
  //       </div>

  //       <div className="product-column details-column">
          
  //       </div>

  //       <div className="product-column buy-column">
  //         <div className="buy-box">
  //           <h1 className="product-title">{product.name}</h1>
  //           <p className="product-description">{product.description}</p>
  //           <p className="product-price">{product.price} €</p>
  //           <p className="product-stock">Stock: {product.stock}</p>
  //           <button className="buy-button">Comprar ahora</button>
  //         </div>
  //       </div>
  //     </div>
  //   </motion.div>
  // );

  return (
    <motion.div
      className="product-page container-fluid bg-white py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="row gx-4 align-items-start d-flex justify-content-between">
        {/* Columna de imágenes a la izquierda */}
        <div className="col-12 col-md-6 mb-4 text-center">
          <img
            src={mainImage}
            alt={product.name}
            className="img-fluid rounded shadow-sm mb-3"
            style={{ width: "400px", height: "400px", objectFit: "cover" }}
          />
          <div className="d-flex gap-2 justify-content-center flex-wrap">
            {galleryImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Vista ${index + 1}`}
                className={`img-thumbnail ${mainImage === img ? "border-primary" : ""}`}
                style={{ width: "60px", height: "60px", cursor: "pointer", objectFit: "cover" }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Columna de información pegada a la derecha */}
        <div className="col-12 col-md-4 d-flex flex-column justify-content-start ms-auto">
          <h1 className="h5 fw-bold">{product.name}</h1>
          <p className="text-muted">{product.description}</p>
          <p className="h6 text-success fw-bold">{product.price} €</p>
          <p className={`fw-medium ${product.stock > 0 ? "text-success" : "text-danger"}`}>
            {product.stock > 0 ? `Stock: ${product.stock}` : "Agotado"}
          </p>
          <button
            className="btn btn-primary btn-lg mt-3 w-100"
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "Comprar ahora" : "No disponible"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
