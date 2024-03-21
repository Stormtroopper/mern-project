import {users,books} from './server.js'
import def from './schema.js';
import 'dotenv/config'
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const User=mongoose.model('book_management_graphql')
const Books=mongoose.model('books_ql')
const secret_key=process.env.SECRET_KEY
const resolvers={
    Query:{
        users:()=>users,
        books:()=>books,
        user:(_,{_id})=>users.find(user=>user._id == _id),
        one_book:(_,{by})=>books.filter(book=>book.by == by)
    },
    Users:{
        books:(user_receive)=>books.filter((book)=>{
           return book.by === user_receive._id
        })
    },
    Mutation:{
        usersignup:async(_,{newUser})=>{
           let user= await User.findOne({email:newUser.email})
            if(user){
                throw new Error('User exists with this email')
            }
                const hashedpwd=await bcrypt.hash(newUser.password,15)
                let newUser_1=new User({
                    ...newUser,password:hashedpwd
                })
                return await newUser_1.save()
            
        },
        // usersignin:async(_,{userSignIn})=>{
        //   const user= await User.findOne({email:userSignIn.email})
        // if(!user){
        //     throw new Error('User doesnt exist')
        // }
        // let matching=await bcrypt.compare(userSignIn.password,user.password)
        // if(!matching){
        //     throw new Error('Password Doesnt match')
        // }    
        // let jwttoken=jwt.sign({userId:user._id,secret_key})
        // return {token:jwttoken}
        // }
        usersignin:async (_,{userSignIn})=>{
            const user = await User.findOne({email:userSignIn.email})
            if(!user){
                throw new Error("User dosent exists with that email")
            }
            const doMatch =await bcrypt.compare(userSignIn.password,user.password)
            if(!doMatch){
                throw new Error("email or password in invalid")
            }
            const token = jwt.sign({userId:user._id},secret_key)
            return {token}
           },
           createbooks:async(_,{title},{userId})=>{
            if(!userId){
                throw new new Error ('Be Logged In Fam')
            }
                const TestBooks=new Books({
                    title,
                    
                    by:userId
                })
                await TestBooks.save()
                return 'Succesfully saved Book'
            }
    }
    
};
export default resolvers