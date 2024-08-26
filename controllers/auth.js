const app = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv')
app.post('/register',(req,res)=>{
    const [name,email,password] = [req.body.name, req.body.email,req.body.password]
    User.create({name:name,email:email,password:password}).then((res)=>{
      console.log("data inserted")
           res.send("ok")
           
    }).catch((err)=>{
      res.send('not ok')
    })
  })
  
  app.post('/login',(req,res)=>{
    console.log("req")
      const userEmail = req.body.email
      const userPassword = req.body.password;
      User.findOne({email:userEmail}).then((rec)=>{
         bcrypt.compare(userPassword, rec.password,(err, result)=>{
          if(err){
            handleError(err)
          }
          if(result){
          const jwtToken = jwt.sign({user:rec},process.env.JWT_TOKEN);
          res.cookie("token",jwtToken);
          res.send(200)
          }else{
            console.log("notauthenticate")
            res.status(500).send("notok")
          }
        })
      })
     
  })

  module.exports = app