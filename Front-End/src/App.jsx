import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Components/Header.jsx'; // Убедитесь, что файл Header.jsx существует
import Product from "./Components/Product.jsx"; // Убедитесь, что файл Product.jsx существует
import ProductDetails from "./Components/ProductDetails.jsx"; // Импорт компонента деталей продукта
import Footer from "./Components/Footer.jsx"; // Убедитесь, что файл Footer.jsx существует
import AddProduct from "./Components/AddProduct.jsx";
import Cart from "./Components/Cart.jsx"
import UpdateProduct from "./Components/UpdateProduct.jsx";
import "./styles/app.css";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/products" element={<Product  />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/update/:id" element={<UpdateProduct />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
