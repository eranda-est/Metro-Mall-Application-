const mongoose = require ("mongoose");

const storeSchema = new mongoose.Schema({
    storeName: {
        type:String,
        trim:true,
        required:true
    },
    location: {
        type: String,
        trim:true,
        required:true
    },
    category: {
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    storeImage:{
        type:String,
        required:true
    },
},
    {
        timestamps:true
    }
);

const store = mongoose.model('Store', storeSchema);
module.exports = store;