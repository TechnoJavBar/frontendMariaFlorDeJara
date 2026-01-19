import "../pages/productsPage.css";
import { getAllProducts } from "../api/products.api.js";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/productCard.jsx";
import EmptyProducts from "../components/emptyProducts.jsx";

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [page, setPage] = useState("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);

  const searcher = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const loadProducts = async () => {
    try {
      const res = await getAllProducts();

      setProducts(res.data.data);
      setCurrentPage(res.page);
    } catch (error) {
      console.log("Error loading products: ", error);
    }
  };

  const results = !search
    ? products
    : products.filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLowerCase())
      );

  useEffect(() => {
    loadProducts();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = results.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );
  // const totalPages = Math.ceil(results.length / productsPerPage);

  return (
    <main className="product-page">
      <div className="filter-container">
        <h2>Product filter</h2>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={searcher}
        />
      </div>
      <div className="product-container">
        {results.length > 0 ? (
          results.map((product) => (
            <ProductCard key={product.code} product={product} />
          ))
        ) : (
          <EmptyProducts /> //Este es la flor de loto
          //<MessageFishes /> // Este son los peces
        )}
      </div>
    </main>
  );
}
{
  /* <div className="pagination">
  {/* Paginación 
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
</div> */
}
