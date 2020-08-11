import React from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data";

function ProductScreen() {
  const { id } = useParams();
  const product = data.products.find((product) => product._id === id);
  console.log(product);
  return (
    <div>
      <div className="back-to-results">
        <Link to="/">
          <i className="material-icons">keyboard_backspace</i> Back to Results
        </Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img src={product.image} alt="product" />
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              Price: <b>€{product.price}</b>
            </li>
            <li>
              Description:
              <div>{product.description}</div>
            </li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Price: €{product.price}</li>
            <li>Status: {product.status}</li>
            <li>
              Qty:
              <select name="" id="">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
              </select>
            </li>
            <li>
              <button className="add-to-cart-btn">Add to Cart</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
