import mongoose from "mongoose";
const userModel=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:
    {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
export default mongoose.model('book_management_graphql', userModel)
