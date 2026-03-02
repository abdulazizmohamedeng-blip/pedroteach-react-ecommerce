import { getProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

export default function Home() {
  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Welcome to ShopHub</h1>
        <p className="home-sbutitle">
          Descover amazing products at amazing pricing
        </p>
      </div>
      <div className="container">
        <div className="product-grid">
          {getProducts().map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
