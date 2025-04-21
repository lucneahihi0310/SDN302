const orders = require("./Data/orders.json");
const users = require("./Data/users.json");
const products = require("./Data/products.json");

const orderSummaries = orders.map(order => {
    const user = users.find(u => u.id === order.userId);
    const product = products.find(p => p.id === order.productId);
  
    return {
      orderId: order.id,
      userName: user ? user.name : "Unknown",
      productName: product ? product.name : "Unknown",
      quantity: order.quantity,
      totalPrice: product ? product.price * order.quantity : 0
    };
  });
  
  console.log(orderSummaries);
  