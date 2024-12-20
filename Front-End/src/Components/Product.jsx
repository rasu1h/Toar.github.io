// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const Product = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setError("Не удалось получить продукты");
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (id) => {
        if (location.pathname === "/") {
            navigate(`products/${id}`); // Навигация на страницу продукта из главной страницы
        } else {
            navigate(`/${id}`); // Навигация на страницу продукта из других страниц
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div id="product-grid">
            {loading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}

            {products.map(product => (
                <div key={product.id} className="product-item" onClick={() => handleClick(product.id)}>
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Product;
