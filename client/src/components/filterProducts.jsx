import {getAllCategory} from '../api/categories.api';
import {useEffect, useState} from 'react';
import './filterProducts.css';

export function FilterProducts(){

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await getAllCategory();
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchCategories();
    }, []);

    return(
        <div className="filter-products">
            <h3>Filtrar</h3>
            <div className="filter-products__categories">
                {categories.map(category => (
                    <div key={category.id} className="filter-products__category">
                        <input type="checkbox" id={`category-${category.id}`} />
                        <label htmlFor={`category-${category.id}`}>{category.name}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}