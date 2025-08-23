import { getAllProducts } from "../api/products.api"
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "./productCard"
import { FaSearch } from "react-icons/fa";
import './productsList.css'

export function ProductsList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Resetear a página 1 al buscar
  };

  // Cargar productos desde la API
  const loadProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (error) {
      console.log("Error cargando productos:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Filtrado por búsqueda
  const results = !search
    ? products
    : products.filter((dato) =>
        dato.name.toLowerCase().includes(search.toLowerCase())
      );

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = results.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(results.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-fluid bg-light py-4">
      {/* Input de búsqueda */}
      <div className="row mb-4">
        <div className="col-12 col-md-6 mx-auto input-group">
          <span class="input-group-text" id="basic-addon1"><FaSearch /></span>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={search}
            onChange={searcher}
            className="form-control form-control-lg"
          />
        </div>
      </div>

      {/* Grid de productos */}
      <div className="row g-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted">
            No se encontraron productos.
          </div>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, idx) => (
              <li
                key={idx}
                className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}