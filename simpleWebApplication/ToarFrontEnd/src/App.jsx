import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Components/Header'; // Убедитесь, что файл Header.jsx существует
import Products from "./Components/Products"; // Убедитесь, что файл Product.jsx существует
import Product from "./Components/Product"; // Импорт компонента деталей продукта
import Footer from "./Components/Footer"; // Убедитесь, что файл Footer.jsx существует
import AddProduct from "./Components/AddProduct";
import Cart from "./Components/Cart"
import UpdateProduct from "./Components/UpdateProduct";
import "./styles/app.css";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/products" element={<Products  />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/update/:id" element={<UpdateProduct />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
