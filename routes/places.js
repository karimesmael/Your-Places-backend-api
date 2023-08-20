const placesController = require("../controllers/places");
const catchAuth = require("../middlware/check-auth");
const express = require("express");
const router = express.Router();
const checkCache = require("../middlware/checkCache");

router.get("/", placesController.getAllPlaces);

router.get("/:placeId", checkCache, placesController.getPlaceById);

router.use(catchAuth);

router.post("/", placesController.createPlace);

router.get("/user/:userId", placesController.getPlacesByUserId);

router.delete("/:placeId", placesController.deletePlace);

router.put("/:placeId", placesController.updatePlace);

module.exports = router;
