const express = require("express")
require('dotenv').config();
const mongoose = require("mongoose")
const {buildSchema} = require('graphql')
const {graphqlHTTP} = require("express-graphql")
const UserModel = require('./model/User')
const app = express();
const SERVER_PORT = 4000

// Schema
const gqlSchema = buildSchema(
  `
    type Query{
      welcome: String,
      greet(name: String): String
      user: User
      users: [User]
    }

    type Mutation{
      addUser(uid: Int, firstname: String, lastname: String, salary: Float): User
    }

    type User{
      uid: Int
      firstname: String 
      lastname: String 
      salary: Float
    }

  `
)

// Root Resolver
const rootResolver = {
  welcome: () => {
    return "Welcome to GraphQL Examples"
  },
  greet: ({name}) => { 
    return `Hello, ${name}`
  },
  user: async () => {
    const user = await UserModel.find({})
    console.log(user)
    return user
  },
  users: async () => {

    const users = await UserModel.find({})
    return users
  },
  addUser: async (user) => {
    console.log(user)
    const {uid, firstname, lastname, salary} = user
    const newUser = UserModel({
      uid, 
      firstname: firstname, 
      lastname: lastname,
      salary: salary
    })
    await newUser.save()
    return newUser
  }
  
}

// GqlHttp Object
const graphqlMiddleware = graphqlHTTP({
  schema: gqlSchema,
  rootValue: rootResolver,
  graphiql: true
});

app.use("/graphql", graphqlMiddleware);


const mongodb_atlas_url = process.env.DB_CONNECTION;

const connectDB = async () => {
    try {
        await mongoose.connect(mongodb_atlas_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Success: Connected to MongoDB');
    } catch (error) {
        console.error('❌ Error: Unable to connect to DB', error.message);
    }
};
app.listen(SERVER_PORT, ()=>{
  console.log(`Server started`)
  connectDB()
  console.log('http://localhost:4000/graphql')
})