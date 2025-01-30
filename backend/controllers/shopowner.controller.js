const ShopOwner = require('../models/shopowner.model');

//create ShopOwner
const create = async (req,res) => {
    try{

       const { shopownername, storename, email, mobile } = req.body;

       const newShopOwner = {
            shopownername: shopownername,
            storename: storename,
            email: email,
            mobile: mobile
        }
        
        const SaveNewShopOwner = new ShopOwner(newShopOwner);
        await SaveNewShopOwner.save();

        return res.status(200).send({
            status: true,
            message: "Shop Owner Registration Successfully Done"
         });

    } catch (err) {
        return res.status(500).send({
            status: false, 
            message: err.message
        });
    }
};

//getAll shopowners
const getAllShopOwners = async (req, res) => {
    try{
       const shopowners = await ShopOwner.find();
       return res.status(200).send({
           status: true,
           message: "Successfully",
           allshopowners: shopowners
       });

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        });
    }
}

//getOneShopOwner
const getOneShopOwner = async (req,res) => {
    try{

        const shopOwnerID = req.params.id; 
        const shopowner = await ShopOwner.findById(shopOwnerID);
        return res.status(200).send({
            status: true,
            message:"shop owner received successfully",
            singleShopOwner: shopowner
        });

    }catch(err){
        return res.status(500).send({
            status:false,
            message:err.message
        });
    }
};

//updateShopOwner
const updateShopOwner = async (req,res)=>{
    try{
        const shopOwnerId = req.params.id;
        const{shopownername, storename, email, mobile} = req.body;

        const updateShopOwner = {
            shopownername:shopownername,
            storename:storename,
            email:email,
            mobile: mobile
        };
        
        const updatedShopOwner = await ShopOwner.findByIdAndUpdate(shopOwnerId,updateShopOwner);

        return res.status(200).send({
            status:true,
            message:"Store updated successfully",
            allshopowners:updatedShopOwner
        })

    }catch(err){
        return res.status(500).send({
            status:false,
            message:err.message
        });

    };
};

//deleteShopOwner
const deleteShopOwner = async (req,res) => {
    try{

        const shopownerId = req.params.id;

        const deleteshopowner = await ShopOwner.findByIdAndDelete(shopownerId);

        return res.status(200).send({
            status:true,
            message:"Store Deleted Successfully",
            deleteshopowner: deleteshopowner
        });

    }catch(err){
        return res.status(500).send({
            status:false,
            message:err.message
        });
    };
};



module.exports = { 
    create,
    getAllShopOwners,
    deleteShopOwner,
    getOneShopOwner,
    updateShopOwner
 };