import express from "express";
import data from "./data";

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(3300, () => console.log("Server Started at port 3300"));
