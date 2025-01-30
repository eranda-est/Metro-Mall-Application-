const Store = require("../models/store.model");
const upload = require('../middleware/uploadMiddleware');


// Create store
const create = async (req, res) => {
    try {
        const { storeName, location, category, description } = req.body;

        // Check if store with the same name already exists
        const existingStore = await Store.findOne({ storeName: storeName });

        // If store already exists, return error
        if (existingStore) {
            return res.status(400).send({
                status: false,
                message: "Store with the same name already exists"
            });
        }

        // Retrieve the file path from req.file
        const storeImage = req.file.originalname;

        const newStore = new Store({
            storeName: storeName,
            location: location,
            category: category,
            description: description,
            storeImage: storeImage,
        });

        await newStore.save();

        return res.status(200).send({
            status: true,
            message: "Store created successfully"
        });

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        });
    }
};


//getAll stores
const getAllStores = async (req,res) => {
    try{

        const stores = await Store.find();
        return res.status(200).send({
            status: true,
            message:"store received successfully",
            allstores:stores
        });

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message
        });
    }
};

//getOneStore
const getOneStore = async (req,res) => {
    try{

        const storeID = req.params.id; 
        const store = await Store.findById(storeID);
        return res.status(200).send({
            status: true,
            message:"store received successfully",
            singleStore: store
        });

    }catch(err){
        return res.status(500).send({
            status:false,
            message:err.message
        });
    }
};

//updateUser
const updateStore = async (req,res)=>{
    try{
        const storeId = req.params.id;
        const{storeName, location, category, description} = req.body;

        const updateStore = {
            storeName:storeName,
            location:location,
            category:category,
            description: description
        };
        
        const updatedStore = await Store.findByIdAndUpdate(storeId,updateStore);

        return res.status(200).send({
            status:true,
            message:"Store updated successfully",
            allstores:updatedStore
        })

    }catch(err){
        return res.status(500).send({
            status:false,
            message:err.message
        });

    };
};

//deleteStore
const deleteStore = async (req,res) => {
    try{

        const storeId = req.params.id;

        const deleteStore = await Store.findByIdAndDelete(storeId);

        return res.status(200).send({
            status:true,
            message:"Store Deleted Successfully",
            deletestore: deleteStore
        });

    }catch(err){
        return res.status(500).send({
            status:false,
            message:err.message
        });
    };
};

module.exports={
    create,
    getAllStores,
    getOneStore,
    deleteStore,
    updateStore,
};