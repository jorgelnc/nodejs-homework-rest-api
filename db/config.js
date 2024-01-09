const mongoose = require('mongoose')



const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log("Database connection successfull");
    } catch(error){
        console.log(error);
        process.exit(1);
    }

};

module.exports = connectToDB;