const { Schema, model, Types } = require("mongoose");

const UserHistorySchema = new Schema({
    ordernum: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        required: true,
        ref:"User"
    },
    menu_name: {
        type: String,
    },
    menu_price: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
    },
    cup_option: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
});

const UserHistory = model("userhistory", UserHistorySchema);
module.exports = { UserHistory };