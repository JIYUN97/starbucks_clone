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
        type: date,
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

const User = model("user", UserHistorySchema);
module.exports = { User };
