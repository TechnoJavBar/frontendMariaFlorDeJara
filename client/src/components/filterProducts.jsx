import {getAllCategory} from '../api/categories.api';
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import './filterProducts.css';

export function FilterProducts() {
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategories = useMemo(
    () => searchParams.getAll("category"),
    [searchParams]
  );

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

    const current = searchParams.getAll("category");
    const equalArrays =
      current.length === newSelected.length &&
      current.every((val) => newSelected.includes(val));

    if (!equalArrays) {
      setSearchParams({ category: newSelected });
    }
  };

  return (
    <div className="filter-products card p-3 mb-4 shadow-sm sticky-top">
      <h5 className="mb-3 fw-bold">Filtrar categorías</h5>
      <div className="filter-products__categories d-flex flex-column gap-2">
        {categories.map((category) => (
          <div key={category.id} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`category-${category.id}`}
              checked={selectedCategories.includes(String(category.id))}
              onChange={() => handleChange(category.id)}
            />
            <label
              className="form-check-label"
              htmlFor={`category-${category.id}`}
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>

      <style jsx>{`
        .filter-products {
          border-radius: 12px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .filter-products:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}