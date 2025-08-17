import {getAllCategory} from '../api/categories.api';
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import './filterProducts.css';

export function FilterProducts() {
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategories = useMemo(() => searchParams.getAll("category"), [searchParams]);

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

  const handleChange = (id) => {
    const idStr = String(id);
    let newSelected;

    if (selectedCategories.includes(idStr)) {
      newSelected = selectedCategories.filter((c) => c !== idStr);
    } else {
      newSelected = [...selectedCategories, idStr];
    }

    // Solo actualizar si cambió realmente
    const current = searchParams.getAll("category");
    const equalArrays =
      current.length === newSelected.length &&
      current.every((val) => newSelected.includes(val));

    if (!equalArrays) {
      setSearchParams({ category: newSelected });
    }
  };

  return (
    <div className="filter-products">
      <h3>Filtrar categorías</h3>
      <div className="filter-products__categories">
        {categories.map((category) => (
          <div key={category.id} className="filter-products__category">
            <input
              type="checkbox"
              id={`category-${category.id}`}
              checked={selectedCategories.includes(String(category.id))}
              onChange={() => handleChange(category.id)}
            />
            <label htmlFor={`category-${category.id}`}>{category.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}