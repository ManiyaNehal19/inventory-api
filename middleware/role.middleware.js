function authorizeRole(...allowedroles){
    return (req, res, next)=>{
        if(!req.user || !allowedroles.includes(req.user.role)){
            return res.status(403).json({message: "You do not have access to this link"})
        }
        next()
    }
}
module.exports = authorizeRole