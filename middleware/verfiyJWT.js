const jwt = require('jsonwebtoken')



const verifyJWT = (req,res,next)=>{
    const token = req.cookies.token || "";
    if(!token){
       return res.send("Nahhh bro")
    }
    try{
        const userDetails  = jwt.verify(token,process.env.JWT_TOKEN)
        res.locals.user = userDetails
        console.log(userDetails)
        next();
    }catch(err){
        console.log(err)
        return res.send("Nah bro")
    }
}

module.exports = verifyJWT