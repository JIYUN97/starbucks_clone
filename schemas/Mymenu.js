const { Schema, model, Types } = require("mongoose");

const MymenuSchema = new Schema({
    user: {
        type: Types.ObjectId,
        required: true,
        ref:"User"
    },
    menu: {
        type: Types.ObjectId,
        required: true,
        ref:"Menu"
    },
    size: {
        type: String,
        required: true,
    },
    cup_option: {
        type: String,
        required: true,
    },
});


const Mymenu = model("mymenu", MymenuSchema);
module.exports = { Mymenu };
