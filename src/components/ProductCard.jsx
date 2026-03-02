import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAuth from "../hooks/useAuth";
export default function ProductCard({ product }) {
  let { currentUser } = useAuth();
  let navigate = useNavigate(null);

  function handleAddToCart() {
    if (!currentUser) {
      navigate("/auth");
    }
  }
  return (
    <div className="product-card">
      <img src={product.image} className="product-card-image" />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">{product.price}</p>
        <div className="product-card-actions">
          <Link className="btn btn-secondary">View Details</Link>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            {" "}
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
