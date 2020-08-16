import express from "express";
import data from "./data";

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((product) => product._id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product not found" });
  }
});

app.listen(3300, () => console.log("Server Started at port 3300"));
