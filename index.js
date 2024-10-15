const express = require('express');
const { resolve } = require('path');

let cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.use(cors());

let Products = [];
// let Products = [
//   { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
//   { productId: 2, name: 'Mobile', price: 12000, quantity: 2 },
//   { productId: 3, name: 'Tablet', price: 35000, quantity: 1 },
//   { productId: 4, name: 'Smart Watch', price: 8000, quantity: 1 },
// ];

function addcartItem(Product, productId, name, price, quantity) {
  Product.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  });
  return Product;
}

app.get('/cart/add', (req, res) => {
  let result = 0;
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseInt(req.query.price);
  let quantity = parseInt(req.query.quantity);
  result = addcartItem(Products, productId, name, price, quantity);
  res.json({ cartItems: result });
});

function editItemQuantity(Product, productId, quantity) {
  for (i = 0; i < Product.length; i++) {
    if (Product[i].productId === productId) {
      Product[i].quantity = quantity;
      if(quantity === 0)
      {
        Product = Product.filter(Item=>Item.quantity!==0)
      }
    }
  }
  return Product;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editItemQuantity(Products, productId, quantity);
  res.json({ cartItems: result });
});

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = Products.filter((item) => item.productId !== productId);
  Products = result;
  res.json(result);
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: Products });
});

function calculateTotalQuantity(Product) {
  let totalQuantity = 0;
  for (i = 0; i < Product.length; i++) {
    totalQuantity += Product[i].quantity;
  }
  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = calculateTotalQuantity(Products);
  res.json({ totalQuantity: result });
});

function calculateTotalPrice(Product) {
  let totalPrice = 0;
  for (i = 0; i < Product.length; i++) {
    totalPrice += Product[i].price*Product[i].quantity;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let result = calculateTotalPrice(Products);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
