import Order from "../models/OrderModel";

// export const retrieveProducts = async (req, res, next) => {
//   const products = await Product.find({});
//   res.send(products);
// };
export const createOrder = async (req, res, next) => {
  const {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  const order = new Order({
    user: req.user._id,
    orderItems,
    shipping,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  });
  const newOrder = await order.save();
  if (newOrder) {
    return res.status(201).send({ msg: "New order created", data: newOrder });
  }
  return res.status(500).send({ msg: "Error in creating order" });
};
export const completeOrder = async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: "Paypal",
      paymentResults: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID,
      },
    };
    const updatedOrder = await order.save();

    res.send({ message: "Order Paid", order: updatedOrder });
  } else {
    return res.status(404).send({ message: "Order not Found" });
  }
};
// export const deleteProduct = async (req, res, next) => {
//   const productId = req.params.id;
//   const product = await Product.findById(productId);
//   if (product) {
//     await product.remove();

//     res.status(200).send({ msg: "Product deleted" });
//   } else {
//     return res.status(500).send({ msg: "Error in deleting product" });
//   }
// };
export const retrieveOrder = async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ msg: "Order not found" });
  }
};
