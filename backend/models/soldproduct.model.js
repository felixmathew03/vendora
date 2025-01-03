import mongoose from "mongoose";

const soldproductSchema=new mongoose.Schema({
    buyerId:{type:String},
    sellerId:{type:String},
    productId:{type:String}
}) 

export default mongoose.model.Soldproducts || mongoose.model("Soldproduct",soldproductSchema);