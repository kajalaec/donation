const jwt = require('jsonwebtoken');
const User = require('../models/user');
module.export= async(req, res, next)=>{
    try{
const token= req.headers.authorization.split(' ')[1];
const decoded= jwt.verify(token , process.env.JWT_SECRET)
req.user=await User.findById(decoded.userId);
next();
    }catch(err){
return res.status(401).json({message: 'Auth Failed'})
    }

    
}