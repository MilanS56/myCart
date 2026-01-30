const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const PRODUCTS = require("./data/products.json");

let cart = []; // server cart

app.get("/products", (req, res) => {
  res.json(PRODUCTS.products);
});

app.get("/cart", (req, res) => {
  res.json(cart);
});

app.post("/cart", (req, res) => {
  const product = req.body;
  const item = cart.find(i => i.id === product.id);

  if (item) {
    if (item.quantity < 10) item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  res.json(cart);
});

app.put("/cart/:id", (req, res) => {
  const { qty } = req.body;
  cart = cart.map(i =>
    i.id == req.params.id ? { ...i, quantity: qty } : i
  );
  res.json(cart);
});

app.delete("/cart/:id", (req, res) => {
  cart = cart.filter(i => i.id != req.params.id);
  res.json(cart);
});

app.delete("/cart", (req, res) => {
  cart = [];
  res.json(cart);
});

app.listen(5000, () =>
  console.log("Server on http://localhost:5000")
);
