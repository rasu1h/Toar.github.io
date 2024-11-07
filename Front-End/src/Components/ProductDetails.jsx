// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
    const { id } = useParams(); // Get product ID from route parameters
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // State for image URL

    const fetchProduct = async () => {
        setLoading(true);
        try {
            // Fetch product details
            const response = await axios.get(`http://localhost:8080/api/products/${id}`);
            const productData = response.data;

            // Fetch product image
            try {
                const imageResponse = await axios.get(
                    `http://localhost:8080/api/products/${productData.id}/image`,
                    { responseType: "blob" }
                );
                const imageUrl = URL.createObjectURL(imageResponse.data); // Create image URL from blob
                setImageUrl(imageUrl);
            } catch (imageError) {
                console.error(`Failed to fetch image for product ${productData.id}:`, imageError);
                setImageUrl(null); // Handle missing image gracefully
            }

            setProduct(productData); // Set product data
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError("Не удалось загрузить информацию о продукте");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct(); // Fetch data on component mount
    }, [id]);

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {product ? (
                <div>
                    {imageUrl ? <img src={imageUrl} alt={product.name} /> : <p>Загрузка изображения...</p>}
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Цена: {product.price}</p>
                </div>
            ) : (
                <p>Продукт не найден</p>
            )}
        </div>
    );
}

export default ProductDetails;
