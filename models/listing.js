const mongoose = require("mongoose");
const review = require("./review");
const { ref } = require("joi");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
      type: Schema.Types.ObjectId,   // type and ref dono relationship establish krne ke kaam aate hai.
      ref: "User",
    },
    category: {
    type: String,
    enum: ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Beaches", "Domes", "Arctic", "Boats"],
    required: true,
  },
});



listingSchema.post("findOneAndDelete", async(listing) => {
  if(listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews }});
  }
});



const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;