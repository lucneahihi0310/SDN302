const users = require("./Data/users.json");
const orders = require("./Data/orders.json");

const user = users.find(user => user.name ==="Alice");

if(!user) {
    console.log("User not found");
    return;
}else{
const userOrders = orders.filter(order => order.userId === user.id);
console.log(userOrders);
}