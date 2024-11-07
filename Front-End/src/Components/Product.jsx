// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState,} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';


const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/products");
            const productsWithImages = await Promise.all(
                response.data.map(async (product) => {
                    try {
                        const imageResponse = await axios.get(`http://localhost:8080/api/products/${product.id}/image`, {responseType: "blob"});
                        const imageUrl = URL.createObjectURL(imageResponse.data);
                        return {...product, imageUrl};
                    } catch (imageError) {
                        console.error(`Failed to fetch image for product ${product.id}:`, imageError);
                        return {...product, imageUrl: null};  // Handle missing images gracefully
                    }
                })
            );
            setProducts(productsWithImages);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setError("Не удалось получить продукты и изображения");
        } finally {
            setLoading(false);
        }
    };
    const handleClick = (id) => {
        navigate(`/${id}`);  // Навигация на страницу продукта
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    return (<div id="product-grid">

        {loading && <p>Загрузка...</p>}
        {error && <p>{error}</p>}

        { products.map(product =>
            (<div key={product.id} className="product-item" onClick={() => handleClick(product.id)} >
                <img src={product.imageUrl} alt={product.name} className="product-image"/>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
            </div>))}
    </div>);

}
export default Product;
