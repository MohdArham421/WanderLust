const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js")




// schemaValidation server side (hoppscotch)
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}


// Server side validation for review (hoppscotch)
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};







// checks if user is authenticated or not
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        //agar user authenticated nahi h
        // save redirectUrl
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listings!");
        return res.redirect("/login");
    }
    next();
} //module.exports.isLoggedIn = (req, res, next) => {    YE HUMNE FUNCTION ISILIYE BANAAYA TAAKI HUM ISSE CALLBACK(CB) MAI USE KR SAKE





// saveRedirectUrl -  path(URL) save krta h ye jispr hum jaa rahe hai
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}





// isowner Checks jo humaare user h .. kya vo iss particular listing ki owner h ya nahi. Agar nahi then you can't update and delete
module.exports.isOwner = async(req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the Owner of this Listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}   // Pehle check karenge ki user loggedIn hai ya nahi then uske baad hum isOwner ko add karenge apne routes mai listing.js mai edit create and delete route mai.



// isReviewAuthor Checks jo humaare user h .. kya vo iss particular Review ka owner h ya nahi. Agar nahi then you can't update and delete
module.exports.isReviewAuthor = async(req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the Author of this Review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
