import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    buyerId:{type:String},
    productId:{type:String}
}) 

export default mongoose.model.Orders || mongoose.model("Order",orderSchema);