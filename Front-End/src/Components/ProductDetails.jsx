import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductDetails() {
    const { id } = useParams(); // Получаем ID из параметров маршрута
    const [product, setProduct] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProduct = async () => {
        const productId = parseInt(id, 10); // Преобразуем строку в целое число

        if (isNaN(productId)) {
            setError("Некорректный идентификатор продукта");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
            const productData = response.data;

            // Fetch product image
            try {
                const imageResponse = await axios.get(
                    `http://localhost:8080/api/products/${productData.id}/image`,
                    { responseType: "blob" }
                );
                const imageUrl = URL.createObjectURL(imageResponse.data);
                setImageUrl(imageUrl);
            } catch (imageError) {
                console.error(`Не удалось загрузить изображение для продукта ${productData.id}:`, imageError);
                setImageUrl(null);
            }

            setProduct(productData);
        } catch (error) {
            setError("Не удалось загрузить информацию о продукте");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
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
