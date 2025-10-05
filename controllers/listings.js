const Listing = require("../models/listing.js");


//index route
module.exports.index = async (req, res) => {
    const { category, q } = req.query;   // get category from query string
    let query = {};  // empty object. Show all

    if (category && category !== "Trending") {
        query.category = category;   // if category exists and isn’t "trending", filter by it
    }


   // q = whatever the user typed in the search bar (req.query.q).
    //q.trim() removes spaces from start and end.
    if (q && q.trim() !== "") {
        query.$or = [                              //   $or means: match at least one of these conditions.
            // Match listings whose "title" contains q
            { title: { $regex: q, $options: "i" } },

            // Match listings whose "location" contains q
            { location: { $regex: q, $options: "i" } },
            { country: { $regex: q, $options: "i" } },

            // Match listings whose "description" contains q
           // { description: { $regex: q, $options: "i" } }
        ];
    }

    const allListings = await Listing.find(query);  // Query mai jo hai uske based pr show karo listings ko

    res.render("./listings/index.ejs", {allListings, category, q});
};



//new
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};



//show
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: {path: "author", }, }).populate("owner");
    if(!listing) {
       req.flash("error", "Listing doesn't exist now"); 
       return res.redirect("/listings");
    }
    //console.log(listing);
    res.render("./listings/show.ejs", {listing});
};




//create
module.exports.createListing = async (req, res) => {
    // let { title, description, image, price, location,country} = req.body;
   
   // let listing = req.body.listing;
   // console.log(listing);
   let url = req.file.path;   // req.file mai store hota h path
   let filename = req.file.filename;   // req.file mai store hota h filename bhi
   // console.log(url, "..", filename);

   const newListing = new Listing(req.body.listing);
   newListing.owner = req.user._id;
   newListing.image = {url, filename}; // newListing k ander jo image h, usme 2 values - url and filename store karaa rahe h
   
   await newListing.save();
   req.flash("success", "New Listing Created");
   res.redirect("/listings");
 };




//show
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
       req.flash("error", "Listing doesn't exist now"); 
       return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", {listing, originalImageUrl});
};



//update
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined") {
      let url = req.file.path;   // req.file mai store hota h path
      let filename = req.file.filename;  // req.file mai store hota h filename bhi
      listing.image = {url, filename}; // newListing k ander jo image h, usme 2 values - url and filename store karaa rahe h
      await listing.save();
    }

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};



//delete
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};