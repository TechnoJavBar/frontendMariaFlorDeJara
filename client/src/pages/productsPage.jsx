import { ProductsList } from '../components/productsList.jsx';
import { FilterProducts } from '../components/filterProducts.jsx';
import './productsPage.css'

export function ProductsPage() {
    return (
        <main className="products-page">
            <h2>Nuestros productos</h2>
            <div className="products-grid">
                <aside className="filter-column">
                    <FilterProducts />
                </aside>
                <section className="products-column">
                    <ProductsList />
                </section>
            </div>
        </main>
    );
}