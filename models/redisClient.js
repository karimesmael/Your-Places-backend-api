const redis = require("redis");

//create redis client
const client = redis.createClient();

//Error handling
client.on("error", (err) => {
  console.log(err);
  throw err;
});

// Send a PING command to Redis
client.on("ready", () => {
  console.log("Connected to Redis server");
});

module.exports = client;
