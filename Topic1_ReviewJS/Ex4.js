const orders = require("./Data/orders.json");
const products = require("./Data/products.json");
function getProductPrice(productId) {
    const product = products.find(p => p.id === productId);
    return product ? product.price : 0;
  }
  
  const totalRevenue = orders.reduce((sum, order) => {
    const price = getProductPrice(order.productId);
    return sum + (price * order.quantity);
  }, 0);
  
  console.log("Total revenue:", totalRevenue);
  