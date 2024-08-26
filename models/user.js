const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
require('../../codespaces-express/config/db')()

const userSchema = new mongoose.Schema({
    email:{type:String, require:true},
    password:{type:String, require:true},
    name:{type:String}
})

userSchema.pre('save', async function(next){
  try{
    console.log('hloh')
    console.log("pass",this.password)
    const salt = await bcrypt.genSalt(10);
    console.log("salt",salt)
    const hashedPassword =await bcrypt.hash(this.password,salt)
    console.log("hp",hashedPassword)
   
    this.password = hashedPassword;
   console.log(this.password)
    next()
  }catch(err){
    next(err)
  }
})

module.exports =mongoose.model("user",userSchema);
