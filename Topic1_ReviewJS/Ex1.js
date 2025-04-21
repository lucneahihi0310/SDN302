const users = require("./Data/users.json");

const userName = users.map((user) => user.name);
console.log(userName);