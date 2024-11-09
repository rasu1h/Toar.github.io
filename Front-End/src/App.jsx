import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Components/Header.jsx';
import Product from "./Components/Product.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";
import Footer from "./Components/Footer.jsx";
import AddProduct from "./Components/AddProduct.jsx";
import Cart from "./Components/Cart.jsx";
import UpdateProduct from "./Components/UpdateProduct.jsx";
import "./styles/app.css";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                {/* Главная страница */}
                <Route path="/" element={<Product />} />

                {/* Страница со списком продуктов */}
                <Route path="/products" element={<Product />} />

                {/* Страница с деталями продукта */}
                <Route path="/products/:id" element={<ProductDetails />} />

                {/* Страница добавления продукта */}
                <Route path="/add_product" element={<AddProduct />} />

                {/* Страница корзины */}
                <Route path="/cart" element={<Cart />} />

                {/* Страница обновления продукта, вложена в ProductDetails */}
                <Route path="/products/:id/update" element={<UpdateProduct />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
