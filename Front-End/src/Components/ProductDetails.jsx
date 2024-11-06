import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
    const { id } = useParams(); // Получаем ID продукта из параметров маршрута
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageData, setImageData] = useState(null); // Add state for image data

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/products/${id}`);
            const productData = response.data;

            // Assuming imageData is stored as byte array in response.data.imageData
            if (productData.imageData) {
                const base64Image = btoa(
                    new Uint8Array(productData.imageData).reduce((data, byte) => data + String.fromCharCode(byte), "")
                );
                setImageData(`data:${productData.imageType};base64,${base64Image}`);
            }

            setProduct(productData);
        } catch (error) {
            setError("Не удалось загрузить информацию о продукте");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct(); // Запрашиваем данные при загрузке страницы
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
                    {imageData ? <img src={imageData} alt={product.brand} /> : <p>Загрузка изображения...</p>}
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
