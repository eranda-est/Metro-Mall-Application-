const express = require('express');
const ShopOwnerRouter = express.Router();

const {
    create,
    getAllShopOwners,
    deleteShopOwner,
    getOneShopOwner,
    updateShopOwner
} = require('../controllers/shopowner.controller');


ShopOwnerRouter.post('/createShopOwner',create);
ShopOwnerRouter.get('/getAllShopOwners',getAllShopOwners);
ShopOwnerRouter.delete('/deleteShopOwner/:id',deleteShopOwner);
ShopOwnerRouter.get('/getOneShopOwner/:id',getOneShopOwner);
ShopOwnerRouter.patch('/updateShopOwner/:id',updateShopOwner);

module.exports =  ShopOwnerRouter;

