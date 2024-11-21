import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductDetails() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const fetchProduct = async () => {
        const productId = parseInt(id, 10);

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
            const productData = response.data;
            setProduct(productData);
        } catch (err) {
            setError(err.response?.data?.message || "Не удалось загрузить информацию о продукте");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {product ? (
                <div>
                    {product.imageUrl ? (
                        <>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                onLoad={() => setIsImageLoading(false)}
                                onError={() => {
                                    setIsImageLoading(false);
                                }}
                            />
                            {isImageLoading && <p>Загрузка изображения...</p>}
                        </>
                    ) : (
                        <div style={{
                            width: "200px",
                            height: "200px",
                            backgroundColor: "#ddd",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <p>Изображение недоступно</p>
                        </div>
                    )}
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
