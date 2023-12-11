
const express = require("express");
const router = express. Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//we can use router.route for same route req

router.route("/")
  //Index Route
  .get(wrapAsync(listingController.index))

  //creat route
  .post(isLoggedIn,
    // validateListing,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
);


//new route
router.get("/new",isLoggedIn,(listingController.renderNewForm)
);

router.route("/:id")
  //Show Route
  .get(wrapAsync(listingController.showListing))

  // update route
  .put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync (listingController.udateListing))

  //delete route
 .delete(
  isOwner,
  isLoggedIn,
  wrapAsync(listingController.distroyListing)
);

//edit route
router.get("/:id/edit",
    isOwner, 
    isLoggedIn,
    wrapAsync(listingController.renderEditForm)
);
  

module.exports = router;