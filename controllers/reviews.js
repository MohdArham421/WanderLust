const Listing = require("../models/listing.js");
const Review = require("../models/review.js");



// create or post review route
module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);  // newReview mai new review store hoga.
    newReview.author = req.user._id;  // newReview k ander author field hogi jisme vo user jo logged in h vo store hoga

    listing.reviews.push(newReview); // newReview listing mai push hojayega.
  // console.log(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Created");

    res.redirect(`/listings/${listing._id}`);
};





// delete review route
module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted");

    res.redirect(`/listings/${id}`);
};