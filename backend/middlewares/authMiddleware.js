const jwt= require("jsonwebtoken");

const authMiddleware=(req,res,next)=>{

    //get token from cookies
   try{ const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message:"No token, authorization denied"});
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
   }catch(error){
    console.error(error);
    res.status(401).json({message:"Token is not valid"});
   }
}
module.exports=authMiddleware;