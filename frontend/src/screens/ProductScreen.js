import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";

function ProductScreen() {
  const { push } = useHistory();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  // Functions
  const handleAddToCart = () => {
    push(`/cart/${id}?qty=${qty}`);
  };

  // Side Effects

  useEffect(() => {
    dispatch(detailsProduct(id));

    return () => {};
  }, [dispatch, id]);

  return (
    <div>
      <div className="back-to-results">
        <Link to="/">
          <i className="material-icons">keyboard_backspace</i> Back to Results
        </Link>
      </div>
      {loading ? (
        <div>Loading </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
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
              <li>
                Status: {product.countInStock > 0 ? "In Stock" : "Unavailable"}
              </li>
              <li>
                Qty:
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((numInStock) => (
                    <option value={numInStock + 1} key={numInStock}>
                      {numInStock + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 && (
                  <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
