import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h1>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        style={{ maxWidth: "200px", margin: "1rem 0" }}
      />
      <p><b>Price:</b> ${product.price}</p>
      <p>{product.description}</p>
      <p><b>Category:</b> {product.category}</p>
    </div>
  );
};

export default ProductDetails;
