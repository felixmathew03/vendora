import mongoose from "mongoose";

const cartSchema=new mongoose.Schema({
    buyerId:{type:String},
    product:{type:Object},
    sizeOrColor:{type:String},
    index:{type:Number},
    quantity:{type:Number}  
}) 

export default mongoose.model.Cartdetails || mongoose.model("Cartdetail",cartSchema);