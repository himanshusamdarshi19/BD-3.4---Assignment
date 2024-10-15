const express = require('express');
const { resolve } = require('path');

let cors = require('cors');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addcartItem(cart, productId, name, price, quantity) {
  cart.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  });
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseInt(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addcartItem(cart, productId, name, price, quantity);
  res.json({ cartItems: result });
});

function editItemQuantity(cart, productId, quantity) {
  for (i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editItemQuantity(cart, productId, quantity);
  res.json({ cartItems: result });
});

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((item) => item.productId !== productId);
  cart = result;
  res.json(result);
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

function calculateTotalQuantity(cart) {
  let totalQuantity = 0;
  for (i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = calculateTotalQuantity(cart);
  res.json({ totalQuantity: result });
});

function calculateTotalPrice(cart) {
  let totalPrice = 0;
  for (i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price*cart[i].quantity;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let result = calculateTotalPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
