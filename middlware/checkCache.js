const redisClient = require("../models/redisClient");

module.exports = async (req, res, next) => {
  const placeId = req.params.placeId;
  let data;
  try {
    await redisClient.connect();
    const result = await redisClient.get(placeId);
    data = JSON.parse(result);
    await redisClient.disconnect();
  } catch (error) {
    console.log(error);
    next();
  }
  if (data) {
    return res.status(200).json({ place: data });
  } else {
    next();
  }
};
