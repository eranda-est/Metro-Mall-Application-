const mongoose = require('mongoose');


const shopOwnerSchema = new mongoose.Schema({
    shopownername: {
        type: String,
        trim: true,
        required:true
    },
    storename: {
        type: String,
        trim: true,
        required:true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required:true
    },
    mobile: {
        type: String,
        trim:true,
        required:true
    }
},
    {
        timestamps:true
    }
);


const ShopOwner = mongoose.model('ShopOwner', shopOwnerSchema);
module.exports = ShopOwner;