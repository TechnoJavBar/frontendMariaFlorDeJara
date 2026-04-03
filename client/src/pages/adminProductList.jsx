import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../api/products.api.js";
import "./adminProductList.css"; // Luego le damos estilos

export const AdminProductList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Función para cargar (y recargar) los productos
    const fetchProductos = async () => {
        try {
            const res = await getAllProducts(1, 100); // Traemos bastantes para el admin
            const info = res.data.data; // Aquí está el objeto con productos y total
            const listaDeProductos = info.productos;
            setProductos(listaDeProductos);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener productos", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    // 2. Función para eliminar
    const handleDelete = async (id, nombre) => {
        const confirmar = window.confirm(`¿Estás seguro de que quieres eliminar "${nombre}"?`);
        if (confirmar) {
            try {
                await deleteProduct(id);
                // Filtramos el estado local para que desaparezca al instante sin recargar
                setProductos(productos.filter(p => p.id !== id));
            } catch (error) {
                alert("No se pudo eliminar el producto");
                console.error("No se pudo eliminar el producto",error);
            }
        }
    };

    if (loading) return <p>Cargando inventario...</p>;

    return (
        <div className="admin-products-page">
            <div className="admin-header">
                <h1>Panel de Inventario</h1><h3>total productos: {productos.length}</h3>
                <Link to="/admin/productos/nuevo" className="btn-create">
                    + Añadir Nuevo Producto
                </Link>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((prod) => (
                        <tr key={prod.id}>
                            <td>
                                <img 
                                    src={prod.imagenes?.[0] || "https://via.placeholder.com/50"} 
                                    alt={prod.nombre} 
                                    className="admin-thumb"
                                />
                            </td>
                            <td>{prod.nombre}</td>
                            <td>{prod.precio}€</td>
                            <td>
                                <span className={`stock-badge ${prod.stock < 5 ? 'low' : ''}`}>
                                    {prod.stock} ud.
                                </span>
                            </td>
                            <td>{prod.categoria}</td>
                            <td className="actions">
                                <Link to={`/admin/productos/editar/${prod.id}`} className="btn-edit">
                                    Editar
                                </Link>
                                <button 
                                    onClick={() => handleDelete(prod.id, prod.nombre)} 
                                    className="btn-delete"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};