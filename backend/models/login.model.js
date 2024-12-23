import mongoose from 'mongoose';

const loginSchema=new mongoose.Schema({
    email:{type:String},
    username:{type:String},
    password:{type:String},
    accountType:{type:String}
})

export default mongoose.model.LoginDetails || mongoose.model("LoginDetail",loginSchema);