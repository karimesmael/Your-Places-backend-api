const placesController = require("../controllers/places");
const catchAuth = require("../middlware/check-auth");
const express = require("express");
const router = express.Router();

router.get("/", placesController.getAllPlaces);

router.get("/:placeId", placesController.getPlaceById);

router.use(catchAuth);

router.get("/user/:userId", placesController.getPlacesByUserId);

router.post("/", placesController.createPlace);

router.delete("/:placeId", placesController.deletePlace);

router.put("/:placeId", placesController.updatePlace);

module.exports = router;
