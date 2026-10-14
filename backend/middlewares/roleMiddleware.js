const roleMiddleware=(...allowedRoles)=>{
    return (req,res,next)=>{

        if(!req.user){
            return res.status(401).json({message:"Not authorized"});
        }
/* 
           console.log("USER ROLE:", req.user.role); */

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message:"Forbidden: You don't have permission to access this resource"});
        }
        next();
    }
}

module.exports=roleMiddleware;