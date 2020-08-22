import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../redux-state/actions/orderActions";

function PlaceOrderScreen() {
  const { push } = useHistory();
  const cart = useSelector((store) => store.cart);
  const { cartItems, shipping, payment } = cart;
  const orderCreate = useSelector((store) => store.orderCreate);
  const { loading, error, success, order } = orderCreate;
  if (!shipping.address) {
    push("/shipping");
  } else if (!payment.paymentMethod) {
    push("/payment");
  }
  const itemsPrice = cartItems.reduce(
    (acc, currItem) => acc + currItem.qty * currItem.price,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = +(itemsPrice * 0.15).toFixed(2);
  const totalPrice = +(itemsPrice + shippingPrice).toFixed(2);

  const dispatch = useDispatch();

  // Functions
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };
  // Side effects
  useEffect(() => {
    if (success) {
      push(`/orders/${order._id}`);
    }
    return () => {};
  }, [success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div>
              {shipping.address}, {shipping.city}, {shipping.postcode},
              {shipping.country},
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method: {payment.paymentMethod}</div>
          </div>
          <div>
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
                        <Link to={`/product/${cartItem.id}`}>
                          {cartItem.name}
                        </Link>
                      </div>
                      <div className="cart-item-qty">Qty: {cartItem.qty}</div>
                    </div>
                    <div className="cart-price">€{cartItem.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button primary full-width"
                disabled={cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>€ {itemsPrice}</div>
            </li>
            <li>
              <div>Tax (Included)</div>
              <div>€ {taxPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>€ {shippingPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>€ {totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
