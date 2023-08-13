const { json } = require("body-parser");
const HttpError = require("../models/http-error");
const Place = require("../models/place");
const User = require("../models/user");

exports.getAllPlaces = async (req, res) => {
  const places = await Place.find();
  if (!places) {
    return res.json({ message: "no places found!" });
  }
  res.json({ places: places || "no places found!" });
};

exports.getPlaceById = async (req, res, next) => {
  const placeId = req.params.placeId;
  const place = await Place.findById(placeId);
  if (!place) {
    const error = new HttpError("This place doesn't exist", 404);
    next(error);
  }
  res.json({ place: place });
};

exports.createPlace = async (req, res) => {
  const { title, address, latitude, longitude } = req.body;
  const creator = req.userId;
  const user = await User.findById(creator);
  if (!user) {
    const error = new HttpError("user not found", 404);
    return next(error);
  }
  const place = new Place({
    title: title,
    address: address,
    location: {
      longitude: longitude,
      latitude: latitude,
    },
    creator: creator,
  });
  await place.save();
  user.places.push(place);
  await user.save();
  res.json({ message: "place created", place: place });
};

exports.deletePlace = async (req, res, next) => {
  const placeId = req.params.placeId;
  await Place.findByIdAndDelete(placeId);
  const user = await User.findById(creator);
  user.places.pull(placeId);
  await user.save();
  res.json({ message: "place is deleted" });
};

exports.updatePlace = async (req, res, next) => {
  const placeId = req.params.placeId;
  const { title, address, latitude, longitude } = req.body;

  let place = await Place.findById(placeId);
  place.title = title;
  place.address = address;
  place.latitude = latitude;
  place.longitude = longitude;
  await place.save();
  res.json({ message: "place is updated", place: place });
};

exports.getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId)
    .select("name email")
    .populate("places");
  res.json({ places: user.places });
};
