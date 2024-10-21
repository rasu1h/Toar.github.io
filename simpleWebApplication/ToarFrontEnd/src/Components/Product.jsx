import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Хук для навигации

function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Используем useNavigate для перенаправления

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/products");
            setProducts(response.data);
        } catch (error) {
            setError("Не удалось получить продукты");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Функция для обработки клика по продукту и перенаправления
    const handleClick = (product) => {

        navigate(`/product/${product.id}`); // Перенаправление на страницу с подробностями продукта
    };
    

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div id="grid">
            {products.length > 0 ? (
                products.map((product) => (
                    <div
                        key={product.id}
                        className="product"
                        onClick={() => handleClick(product)} // Обработка клика
                        style={{ cursor: "pointer", padding: "10px", background: "#eee", margin: "10px" }}
                    >
                        <h2>{product.name}</h2>
                    </div>
                ))
            ) : (
                <p>Нет доступных продуктов</p>
            )}
        </div>
    );
}

export default Product;
