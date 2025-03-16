import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { fetchProducts, likeProduct, searchProducts } from "../services/api";

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
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <p>{product.category}</p>
            <p>{product.subcategory}</p>
            <button onClick={() => handleLike(product.id)}>
              Like ({product.likes})
            </button>
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
