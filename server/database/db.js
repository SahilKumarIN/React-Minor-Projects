const mongoose = require('mongoose');

const connectDB = async ()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database Connected Successfully!');
    } catch (error) {
        console.log('Error while connecting with the Database',error.message);
    }
}

module.exports = connectDB;