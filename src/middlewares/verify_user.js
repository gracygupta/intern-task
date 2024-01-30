const User = require("../model/user");
const secret = process.env.SECRET_TOKEN;
const jwt = require("jsonwebtoken");

exports.isValidUser = async(req,res,next)=>{
    try{
        const token = req.headers.token;
        if(!token){
            return res.status(400).json({
                success: false,
                messsage: "invalid user"
            });
        }
        
        const user = jwt.verify(token, secret);
        console.log(token, " " ,user);
        if(user.data.id){
            req.user = user.data;
            next();
        }
        else{
            return res.status(400).json({
                success: false,
                message: "invalid user"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}