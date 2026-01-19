import { useParams } from "react-router-dom";
import { getProductById } from "../api/products.api";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EmptyProducts from "../components/emptyProducts.jsx";
import "./productsView.css";

export function ProductsView() {
  const { code } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    async function findProduct() {
      try {
        const res = await getProductById(code);
        console.log(res.data);
        setProduct(res.data);
        setMainImage(res.data.img1); // Imagen principal por defecto
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        return <EmptyProducts />;
      }
    }

    findProduct();
  }, [code]);

  //TODO: agregar un loader spinner
  if (!product) return <p>SPINNER</p>;

  const galleryImages = [product.img1, product.img2, product.img3].filter(
    Boolean
  );

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
            alt={product.nombre}
            className="img-fluid rounded shadow-sm mb-3"
            style={{ width: "400px", height: "400px", objectFit: "cover" }}
          />
          <div className="d-flex gap-2 justify-content-center flex-wrap">
            {galleryImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Vista ${index + 1}`}
                className={`img-thumbnail ${
                  mainImage === img ? "border-primary" : ""
                }`}
                style={{
                  width: "60px",
                  height: "60px",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Columna de información pegada a la derecha */}
        <div className="col-12 col-md-4 d-flex flex-column justify-content-start ms-auto">
          <h1 className="h5 fw-bold">{product.nombre}</h1>
          <p className="text-muted">{product.descripcion}</p>
          <p className="h6 text-success fw-bold">{product.precio} €</p>
          <p
            className={`fw-medium ${
              product.stock > 0 ? "text-success" : "text-danger"
            }`}
          >
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
