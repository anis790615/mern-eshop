import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function PaypalButton(props) {
  const [sdkReady, setSdkReady] = useState(false);
  // functions
  const addPaypalSdk = async () => {
    const result = await axios.get("/api/config/paypal");
    const clientId = result.data;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: props.amount,
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then((details) => props.onSuccess(data, details))
      .catch((error) => console.log(error));
  };

  // Effects
  useEffect(() => {
    if (!window.paypal) {
      addPaypalSdk();
    }
    return () => {};
  }, []);
  if (!sdkReady) {
    return <div>Loading...</div>;
  }
  const PaypalButton = window.paypal.Buttons.driver("react", {
    React,
    ReactDOM,
  });
  return (
    <PaypalButton
      {...props}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

export default PaypalButton;
