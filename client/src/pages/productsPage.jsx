import "../pages/productsPage.css";
import { getAllProducts } from "../api/products.api.js";
import { useEffect, useState, useCallback } from "react";
import { ProductCard } from "../components/productCard.jsx";
import EmptyProducts from "../components/emptyProducts.jsx";

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 9; // Tu "limit"

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllProducts(currentPage, productsPerPage);

      // 1. Extraemos los datos según la estructura que me pasaste
      const info = res.data.data; // Aquí está el objeto con productos y total
      const listaDeProductos = info.productos;
      const totalItems = info.total; // Aquí vale 90

      // 2. Guardamos los productos
      setProducts(listaDeProductos);

      // 3. CALCULAMOS EL TOTAL DE PÁGINAS
      // Dividimos 90 entre 8 (productsPerPage) y redondeamos hacia arriba
      const calculoPaginas = Math.ceil(totalItems / productsPerPage);
      setTotalPages(calculoPaginas);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, productsPerPage]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const searcher = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Siempre volver a la pág 1 al buscar
  };

  return (
    <main className="product-page">
      <div className="filter-container">
        <h2>Product filter</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={searcher}
        />
      </div>

      <div className="main-content">
        <div className="product-container">
          {loading ? (
            <p>Cargando productos...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <EmptyProducts />
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination-container">
            {/* Botón Anterior */}
            <button
              className="btn-pag"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>

            {/* Números de página */}
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                className={`btn-pag ${currentPage === idx + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}

            {/* Botón Siguiente */}
            <button
              className="btn-pag"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
