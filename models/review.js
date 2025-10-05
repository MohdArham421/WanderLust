const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
     author: {
          type: Schema.Types.ObjectId,   // type and ref dono relationship establish krne ke kaam aate hai.
          ref: "User",    // koi na koi user logged in hoga and vahi humaara author banega
        },
});


module.exports = mongoose.model("Review", reviewSchema);