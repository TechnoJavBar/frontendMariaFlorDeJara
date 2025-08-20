import { getAllProducts } from "../api/products.api"
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "./productCard"
import './productsList.css'

export function ProductsList() {

  //Para el fetch de la api
  const [products, setProducts] = useState([]);
  
  //Para el filtro de busqueda
  const [search, setSearch] = useState("");

  //Funcion para la barra de busqueda

  const searcher = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }

  const loadProducts = async () => {
    try{
      const res = await getAllProducts()
      setProducts(res.data);
    }
    catch(error){
      console.log("error cargando productos:", error);
    }
    
  }

  //metodo de filtrado
  let results = []
  if (!search)
  {
    results = products
  }
  else
  {
    results = products.filter( (dato) =>
    dato.name.toLowerCase().includes(search.toLocaleLowerCase())
    )
  }

  useEffect(() => {
    loadProducts();

  }, []);

  return (
    <>
    <input type="text" placeholder="Buscar por nombre" value={search} onChange={searcher} className="searchTab"></input>
    <div className="productsList">
      {results.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </>
  );
}