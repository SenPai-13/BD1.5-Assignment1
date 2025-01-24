const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
let taxRate = 5; //5%
let discountPercentage = 10; //10%
let loyaltyRate = 2; // 2 points per $1

// BD1.5 - Assignment 1 : Endpoint 1: Calculate the total price of items in the cart
function totalCartPrice(newItemPrice, cartTotal) {
  return newItemPrice + cartTotal;
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(totalCartPrice(newItemPrice, cartTotal).toString());
});

// BD1.5 - Assignment 1 : Endpoint 2 : Apply a discount based on membership status

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let finalPrice;
  if (isMember) {
    finalPrice = cartTotal - (cartTotal * discountPercentage) / 100;
  } else {
    finalPrice = cartTotal;
  }
  res.send(finalPrice.toString());
});

// BD1.5 - Assignment 1 : Endpoint 3 : Calculate tax on the cart total

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = (cartTotal * taxRate) / 100;
  res.send(tax.toString());
});

// BD1.5 - Assignment 1 : Endpoint 4 : Estimate delivery time based on shipping method

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let time;
  if (shippingMethod === 'standard') {
    time = distance / 50;
  } else {
    time = distance / 100;
  }
  res.send(time.toString());
});

// BD1.5 - Assignment 1 : Endpoint 5 : Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shipingCost = weight * distance * 0.1;
  res.send(shipingCost.toString());
});

// BD1.5 - Assignment 1 : Endpoint 6 : Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let points = purchaseAmount * loyaltyRate;
  res.send(points.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
