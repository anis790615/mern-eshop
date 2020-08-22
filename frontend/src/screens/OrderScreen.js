import React, { useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder, payOrder } from "../redux-state/actions/orderActions";
import PaypalButton from "../components/PaypalButton";

function OrderScreen() {
  const { push } = useHistory();
  const { id } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = orderPay;
  const dispatch = useDispatch();

  // Functions
  const handleSuccessPayment = (paymentResults) => {
    dispatch(payOrder(order, paymentResults));
  };
  // Side effects
  useEffect(() => {
    if (successPay) {
      push("/profile");
    } else {
      dispatch(detailsOrder(id));
    }
    return () => {};
  }, [successPay]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error.message}</div>
  ) : (
    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div>
              {order.shipping.address}, {order.shipping.city},{" "}
              {order.shipping.postcode},{order.shipping.country},
            </div>
            <div>
              {order.isDelivered
                ? `Delivered at ${order.deliveredAt}`
                : "Not Delivered"}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method: {order.payment.paymentMethod}</div>
            <div>{order.isPaid ? `Paid at ${order.paidAt}` : "Not Paid"}</div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Order Items</h3>
                <div>Price</div>
              </li>
              {order.orderItems.length === 0 ? (
                <div>No Order</div>
              ) : (
                order.orderItems.map((orderItem) => (
                  <li key={orderItem.id}>
                    <div className="cart-image">
                      <img src={orderItem.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={`/product/${orderItem.id}`}>
                          {orderItem.name}
                        </Link>
                      </div>
                      <div className="cart-item-qty">Qty: {orderItem.qty}</div>
                    </div>
                    <div className="cart-price">€{orderItem.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li className="placeorder-action-payment">
              {!order.isPaid && (
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment}
                />
              )}
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>€ {order.itemsPrice}</div>
            </li>
            <li>
              <div>Tax (Included)</div>
              <div>€ {order.taxPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>€ {order.shippingPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>€ {order.totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
