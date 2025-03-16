import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import {
  fetchProducts,
  likeProduct,
  searchProducts,
  unlikeProduct,
} from "../services/api";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadProducts = async () => {
      const response = query
        ? await searchProducts(query)
        : await fetchProducts(page, limit);
      setProducts(response.data);
    };
    loadProducts();
  }, [page, limit, query]);

  const handleLike = async (id) => {
    await likeProduct(id, token);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, likes: product.likes + 1 } : product
      )
    );
  };

  const handleUnlike = async (id) => {
    await unlikeProduct(id, token);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, likes: product.likes - 1 } : product
      )
    );
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <input
        type="text"
        placeholder="Search products"
        value={query}
        onChange={handleSearch}
      />
      {/* Display products in a card view */}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              margin: "10px",
              width: "250px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2>{product.name}</h2>
            <p>
              <strong>Price:</strong> {product.price}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Subcategory:</strong> {product.subcategory}
            </p>
            <button onClick={() => handleLike(product.id)}>
              Like ({product.likes})
            </button>
            <button onClick={() => handleUnlike(product.id)}>Unlike</button>
          </div>
        ))}
      </div>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default HomePage;
