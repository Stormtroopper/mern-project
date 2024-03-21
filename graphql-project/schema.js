
const def=`#graphql
type Books{
    title:String,!
    author:String,!
    by:ID
}
type Users{
    _id:ID!,
    firstName:String!,
    lastName:String!,
    email:String!,
    password:String!
    books:[Books]
}
type Query{
    users:[Users],
    user(_id:ID!):Users,
    books:[Books],
    one_book(by:ID!):[Books]
}
type Token{
    token:String!
}
type Mutation{
    usersignup(newUser:UserInput!):Users
    usersignin(userSignIn:UserSignIn!):Token
    createbooks(title:String!):String
}
input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
}
input BooksInput{
    title:String!,
    author:String!
}
input UserSignIn{
    email:String!
    password:String!
}
`
export default def