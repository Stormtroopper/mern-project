import mongoose from 'mongoose'
const bookModel=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book_management_graphql"
    }
})
export default mongoose.model('books_ql', bookModel)