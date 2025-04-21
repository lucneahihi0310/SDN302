const products = require("./Data/products.json");

const mostexpensiveProduct = products.reduce((max, product) => {
  return max.price > product.price ? max : product;
});

console.log(mostexpensiveProduct);