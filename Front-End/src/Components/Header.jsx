import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";

// Компонент поиска с подсказками
function SearchBar() {
    const [keyword, setKeyword] = useState(""); // Состояние для ключевого слова
    const [suggestions, setSuggestions] = useState([]); // Состояние для подсказок
const navigate = useNavigate();
    const handleChange = async (event) => {
        const value = event.target.value;
        setKeyword(value);

        if (value.length >= 1) {
            // Если длина строки больше или равна 1, делаем запрос на сервер
            try {
                const response = await axios.get(`http://localhost:8080/api/products/search?keyword=${value}`);
               setSuggestions(response.data);
            } catch (error) {
                console.error("Ошибка при поиске:", error);
            }
        } else {
            setSuggestions([]); // Очищаем подсказки, если длина строки меньше 1
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        setKeyword(suggestion.name); // Устанавливаем выбранный продукт как текст в поле
        setSuggestions([]); // Очищаем подсказки
        navigate(`/products/${suggestion.id}`);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={keyword}
                onChange={handleChange}
                placeholder="Поиск продукта..."
            />
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((suggestion) => (
                        <li key={suggestion.id} onClick={() => handleSelectSuggestion(suggestion)} className="suggestion-item">
                            <div className="suggestion-image">
                                <img src={suggestion.imageUrl || "default-image.jpg"} alt={suggestion.name} />
                            </div>
                            <div className="suggestion-info">
                                <span className="suggestion-name">{suggestion.name}</span>
                                <span className="suggestion-price">{suggestion.price} ₽</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// Обновленный Header компонент
function Header() {
    return (
        <header>
            <h1>Toar</h1>
            <nav>
                <ul>
                    <li><Link to="/">ГЛАВНАЯ</Link></li>
                    <li><Link to="/products">КАТАЛОГ</Link></li>
                    <li><Link to="/add_product">Добавить товар</Link></li>
                    <li><Link to="/cart">Корзина</Link></li>
                </ul>
            </nav>
            {/* Добавляем компонент поиска */}
            <SearchBar />
        </header>
    );
}

export default Header;
