import { getAllProducts } from "../api/products.api"
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "./productCard"
import './productsList.css'

export function ProductsList() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const selectedCategories = useMemo(() => searchParams.getAll("category"), [searchParams]);

  useEffect(() => {
    async function loadProducts() {
      try {
        let query = "";

        if (selectedCategories.length > 0) {
          query = selectedCategories.map((c) => `category=${c}`).join("&");
        }

        const res = await getAllProducts(query);
        setProducts(res.data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    }

    loadProducts();
  }, [selectedCategories]);

  return (
    <div className="productsList">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}