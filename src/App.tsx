import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./components/HomePage";
import Login from "./components/Login";
import ProductDetail from "./components/ProductDetail";
import Register from "./components/Register";
import Admin from "./Layouts/admin";

function App() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} ></Route>
        <Route path="/product/:id" element={<ProductDetail />} ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />} ></Route>
      </Routes>
      <Routes>
      <Route path="/admin" element={<Admin product={products} />} ></Route>
      </Routes>
  
      <Footer />
    </>
  );
}

export default App;
