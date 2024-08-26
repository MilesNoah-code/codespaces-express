const { default: mongoose } = require("mongoose");
require('dotenv').config()
const connectDB = async () =>{
  try{
    const conn = await mongoose.connect(process.env.MONGO_DB_URL)
    console.log(`DB Conncted at ${conn.connection.host}`)
    return conn
  }
  catch(err){
    console.log(err)
    
  }
}

module.exports = connectDB;