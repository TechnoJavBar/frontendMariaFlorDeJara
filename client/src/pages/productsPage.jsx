import { ProductsList } from '../components/productsList.jsx';
import { FilterProducts } from '../components/filterProducts.jsx';
import './productsPage.css'

export function ProductsPage() {
    return (
  <main className="products-page bg-dark container-fluid w-100 min-vh-100 py-4">
    <div className="container">
      <h2 className="mb-4 text-center text-lg-start">Nuestros productos</h2>

      <div className="row gx-4">
        {/* Columna de filtros */}
        <aside className="col-12 col-lg-3 mb-4 mb-lg-0">
          <FilterProducts />
        </aside>

        {/* Columna de productos */}
        <section className="col-12 col-lg-9">
          <div className="row g-3">
            <ProductsList />
          </div>
        </section>
      </div>
    </div>
  </main>
);
}