import mongoose from "mongoose";

const companySchema=new mongoose.Schema({
    sellerId:{type:String},
    name:{type:String},
    location:{type:String}
})

export default mongoose.model.Companydetails || mongoose.model("Companydetail",companySchema);