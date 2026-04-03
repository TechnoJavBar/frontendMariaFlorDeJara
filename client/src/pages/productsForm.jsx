import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Asumiendo que tus funciones de API aceptan FormData ahora
import { createProduct, updateProduct, getProductById } from "../api/products.api";
import "./productsForm.css";

export const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Estado para los datos de texto/número del producto
    const [producto, setProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        categoria: "complementos"
    });

    // --- NUEVOS ESTADOS PARA GESTIÓN DE IMÁGENES ---
    // imagenesExistentes: URLs (strings) que vienen de la BD/S3
    const [imagenesExistentes, setImagenesExistentes] = useState([]);
    // nuevosArchivos: Objetos File (binarios) seleccionados en el input
    const [nuevosArchivos, setNuevosArchivos] = useState([]);

    // Cargar producto si estamos editando
    useEffect(() => {
        if (id) {
            const loadProduct = async () => {
                try {
                    const res = await getProductById(id);
                    // Separamos las imágenes del resto de datos
                    const { imagenes, ...dataRest } = res.data;
                    
                    setProducto({
                        nombre: dataRest.nombre || "",
                        descripcion: dataRest.descripcion || "",
                        precio: dataRest.precio || 0,
                        stock: dataRest.stock || 0,
                        categoria: dataRest.categoria || "complementos"
                    });
                    
                    setImagenesExistentes(imagenes || []);
                    
                } catch (error) {
                    console.error("Error al cargar el producto", error);
                }
            }
            loadProduct();
        }
    }, [id]);

    // Manejador para inputs de texto y número
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: name === "precio" || name === "stock" ? Number(value) : value
        });
    };

    // --- LÓGICA PARA ARCHIVOS NUEVOS ---
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Validar máximo 5 imágenes totales (Existentes + Seleccionadas + Nuevas)
        if (imagenesExistentes.length + nuevosArchivos.length + files.length > 5) {
            alert("Máximo 5 imágenes permitidas en total.");
            return;
        }

        const validFiles = files.filter(file => file.type.startsWith('image/'));
        if (validFiles.length !== files.length) {
            alert("Solo se permiten archivos de imagen.");
        }

        // Añadimos los nuevos archivos al estado de archivos locales
        setNuevosArchivos([...nuevosArchivos, ...validFiles]);

        // Resetear el input file
        e.target.value = null;
    };

    // Eliminar una imagen que ya está en el servidor (S3)
    const removeImagenExistente = (url) => {
        setImagenesExistentes(imagenesExistentes.filter(img => img !== url));
    };

    // Eliminar un archivo seleccionado localmente antes de subirlo
    const removeNuevoArchivo = (index) => {
        setNuevosArchivos(nuevosArchivos.filter((_, i) => i !== index));
    };

    // --- ENVÍO DE DATOS CON FORMDATA ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", producto.nombre);
        formData.append("descripcion", producto.descripcion);
        formData.append("precio", producto.precio);
        formData.append("stock", producto.stock);
        formData.append("categoria", producto.categoria);

        // 1. Enviamos las URLs que el usuario NO borró (para que el backend sepa qué mantener)
        formData.append("imagenes_mantener", JSON.stringify(imagenesExistentes));

        // 2. Añadimos cada archivo nuevo al FormData
        nuevosArchivos.forEach((file) => {
            formData.append("imagenes_nuevas", file);
        });

        try {
            if (id) {
                await updateProduct(id, formData);
                alert("Producto actualizado con éxito");
            } else {
                await createProduct(formData);
                alert("Producto creado con éxito");
            }
            navigate("/admin/productos");
        } catch (error) {
            console.error("Error al guardar", error);
            alert("Error al guardar el producto.");
        }
    };

    return (
        <div className="form-container">
            <h1>{id ? "Editar Producto" : "Nuevo Producto"}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={producto.nombre}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción detallada"
                    value={producto.descripcion}
                    onChange={handleChange}
                    rows="4"
                />
                <div className="form-row">
                    <input
                        type="number"
                        name="precio"
                        placeholder="Precio (€)"
                        value={producto.precio}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                    />
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock disponible"
                        value={producto.stock}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
                <input
                    name="categoria"
                    placeholder="Categoría (ej. Camisetas)"
                    value={producto.categoria}
                    onChange={handleChange}
                />

                <div className="imagenes-section">
                    <div className="imagenes-header">
                        <label>Imágenes del Producto</label>
                        <span className="contador">
                            ({imagenesExistentes.length + nuevosArchivos.length}/5)
                        </span>
                    </div>

                    <div className="file-input-wrapper">
                        <input
                            type="file"
                            id="file-upload"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={(imagenesExistentes.length + nuevosArchivos.length) >= 5}
                        />
                        <label 
                            htmlFor="file-upload" 
                            className={`file-upload-btn ${(imagenesExistentes.length + nuevosArchivos.length) >= 5 ? 'disabled' : ''}`}
                        >
                            {(imagenesExistentes.length + nuevosArchivos.length) >= 5 ? "Límite alcanzado" : "Seleccionar Imágenes"}
                        </label>
                        <p className="help-text">Formatos aceptados: JPG, PNG, WEBP. Máx 5.</p>
                    </div>

                    <div className="imagenes-preview-grid">
                        {/* 1. Renderizar imágenes que YA están en la nube */}
                        {imagenesExistentes.map((url, index) => (
                            <div key={`existente-${index}`} className="img-item-card existing">
                                <img src={url} alt={`Existente ${index}`} />
                                <div className="img-info">
                                    <span className="img-name">En la nube</span>
                                </div>
                                <button 
                                    type="button" 
                                    className="btn-remove-img" 
                                    onClick={() => removeImagenExistente(url)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}

                        {/* 2. Renderizar archivos NUEVOS seleccionados localmente */}
                        {nuevosArchivos.map((file, index) => (
                            <div key={`nuevo-${index}`} className="img-item-card new">
                                <img src={URL.createObjectURL(file)} alt={`Nuevo ${index}`} />
                                <div className="img-info">
                                    <span className="img-name" title={file.name}>{file.name}</span>
                                    <span className="img-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                </div>
                                <button 
                                    type="button" 
                                    className="btn-remove-img" 
                                    onClick={() => removeNuevoArchivo(index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn-save">
                    {id ? "Guardar Cambios" : "Crear Producto"}
                </button>
            </form>
        </div>
    );
};