const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//import ApolloServer
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schema')
const resolver = require('./resolvers')

//Store sensitive information to env variables
const dotenv = require('dotenv');
dotenv.config();

//mongoDB Atlas Connection String
//TODO - Replace you Connection String here
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

//Define Apollo Server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
});

//Define Express Server
const app = express();
app.use(express.json());
app.use('*', cors());

//Add Express app as middleware to Apollo Server
server.applyMiddleware({ app });

//Start listen 
app.listen({ port: process.env.PORT }, () => {  
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
  connectDB()
});
