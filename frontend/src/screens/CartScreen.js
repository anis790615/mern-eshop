import React, { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

function CartScreen() {
  const { id } = useParams();
  const { push } = useHistory();
  const qty = +useHistory().location.search.split("=")[1] || 1;
  const cart = useSelector((store) => store.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  // Functions
  const removeFromCartHandler = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  const checkoutHandler = () => {
    push("/signin?redirect=shipping");
  };
  // Side effects
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
    return () => {};
  }, [dispatch, id, qty]);

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is Empty</div>
          ) : (
            cartItems.map((cartItem) => (
              <li key={cartItem.id}>
                <div className="cart-image">
                  <img src={cartItem.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={`/product/${cartItem.id}`}>{cartItem.name}</Link>
                  </div>
                  <div className="cart-item-qty">
                    Qty:
                    <select
                      value={cartItem.qty}
                      onChange={(e) =>
                        dispatch(addToCart(cartItem.id, e.target.value))
                      }
                    >
                      {[...Array(cartItem.countInStock).keys()].map(
                        (numInStock) => (
                          <option value={numInStock + 1} key={numInStock}>
                            {numInStock + 1}
                          </option>
                        )
                      )}
                    </select>
                    <button
                      className="button secondary"
                      type="button"
                      onClick={() => removeFromCartHandler(cartItem.id)}
                    >
                      Delete Item
                    </button>
                  </div>
                </div>
                <div className="cart-price">€{cartItem.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ({cartItems.reduce((acc, currItem) => acc + currItem.qty, 0)}{" "}
          items) : €
          {cartItems.reduce(
            (acc, currItem) => acc + currItem.qty * currItem.price,
            0
          )}
        </h3>
        <button
          className="button primary"
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
