require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Restaurant = require('./models/Restaurant');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const seedDatabase = async () => {
    try {
        const data = JSON.parse(fs.readFileSync('./restaurants.json', 'utf-8'));
        await Restaurant.insertMany(data);
        console.log("Data imported successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error importing data:", error);
    }
};

seedDatabase();