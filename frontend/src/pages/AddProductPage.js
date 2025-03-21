import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { addProduct } from "../services/api";

const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    subcategory: "",
  });

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (!token && !storedToken) {
      navigate("/login", { state: { from: "/add-product" } });
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedToken = sessionStorage.getItem("token");
    const productToSubmit = { ...product, price: Number(product.price) };
    await addProduct(productToSubmit, storedToken);
  };

  return (
    <div>
      <h1>Add Product Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subcategory"
          placeholder="Subcategory"
          value={product.subcategory}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
