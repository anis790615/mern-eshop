import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveShipping } from "../redux-state/actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {
  const { push } = useHistory();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  // const cart = useSelector((state) => state.cart);
  // const { shipping } = cart;
  const dispatch = useDispatch();

  // Functions
  const handleSubmit = (e) => {
    dispatch(saveShipping({ address, city, postcode, country }));
    push("payment");
    e.preventDefault();
  };
  // Side Effects

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={(e) => setCity(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="postcode">Post Code</label>
              <input
                type="text"
                name="postcode"
                id="postcode"
                onChange={(e) => setPostcode(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
              />
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

export default ShippingScreen;
