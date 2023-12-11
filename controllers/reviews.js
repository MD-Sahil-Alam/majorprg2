const Review = require("../models/review.js");
const Listing = require("../models/listing.js");


module.exports.createReview = async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    console.log(newReview)
    await newReview.save();
    await listing.save();
    req.flash("success", "Review added succcessfully!")
    console.log("new review saved");
    res.redirect(`/listings/${listing._id}`);
};


module.exports.distroyReview = async (req, res) => { 
    let { id, reviewId } = req.params;
  
    await Listing.findByIdAndUpdate (id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted succcessfully!")
    res.redirect(`/listings/${id}`);
};