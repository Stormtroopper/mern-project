import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from '@apollo/server/standalone'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

import 'dotenv/config'
const uri=process.env.MONGODB_URI
mongoose.connect(uri)
mongoose.connection.on('connected',()=>{
    console.log('connected to the database');
})
mongoose.connection.on('error',(error)=>{
    console.log('Not connected dumbass',error);
})
import def from "./schema.js";
import './models/users.js'
import './models/books.js'
import resolvers from "./resolvers.js";
// const def=`#graphql
// type Books{
//     title:String,
//     author:String,
//     by:ID
// }
// type Users{
//     id:ID!,
//     firstName:String,
//     lastName:String,
//     email:String,
//     password:String
//     books:[Books]
// }
// type Query{
//     users:[Users],
//     user(id:ID!):Users,
//     books:[Books],
//     one_book(by:ID!):[Books]
// }
// `
const books=[
    {
        title:'By River Padre I Sat Down and wept',
        author:'Paulo Coelho',
        by:'63'
    },
    {
        title:'The Firm',
        author:'John Grisham',
        by:'23'
    },
    {
        title:'The Odessa Files',
        author:'Fredrick Forsyth',
        by:'43'
    },
    {
        title:'Famous Five',
        author:'Enid Blyton',
        by:'63'
    }
]
const users=[{
    _id:'23',
    firstName:'Clara',
    lastName:'Delivine',
    email:'abc@ghm.com',
    password:'2213343cd'
},
{
    _id:'63',
    firstName:'Yusuf',
    lastName:'Moussa',
    email:'xyc@ghm.com',
    password:'9908723er'
},
{
    _id:'43',
    firstName:'Jake',
    lastName:'GrimReaper',
    email:'tty@ghm.com',
    password:'0720991ma'
}]
// const resolvers={
//     Query:{
//         users:()=>users,
//         books:()=>books,
//         user:(_,{id})=>users.find(user=>user.id == id),
//         one_book:(_,{by})=>books.filter(book=>book.by == by)
//     },
//     Users:{
//         books:(user_receive)=>books.filter((book)=>{
//            return book.by === user_receive.id
//         })
//     }
    
// };
const server=new ApolloServer({
    typeDefs:def,
    resolvers,
    context:({req})=>{
        const{authorization}=req.headers
        if(authorization){
            console.log(authorization);
           const {userId}= jwt.verify(authorization,secret_key)
            return {userId}
        }   
    },
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

const {url}=await startStandaloneServer(server,{
    listen:{port:4000},
});
console.log(`Server running at port ${url}`);
export  {users,books}