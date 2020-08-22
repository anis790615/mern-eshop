import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { savePayment } from "../redux-state/actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen() {
  const { push } = useHistory();
  const [paymentMethod, setPaymentMethod] = useState("");
  // const cart = useSelector((state) => state.cart);
  // const { payment } = cart;
  const dispatch = useDispatch();

  // Functions
  const handleSubmit = (e) => {
    dispatch(savePayment({ paymentMethod }));
    push("placeorder");
    e.preventDefault();
  };
  // Side Effects

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <input
                type="radio"
                name="paymentMethod"
                id="paymentMethod"
                value="Paypal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="paymentMethod">Paypal</label>
            </li>
            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default PaymentScreen;
