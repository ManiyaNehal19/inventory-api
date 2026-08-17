const {verifyAccessToken} = require("../utils/token.utils");

function requireAuth(req, res, next){
    // console.log(req)
    const token = req.cookies?.accessToken;
    if(!token){
        return res.status(401).json({error:"Not authenticated"});
    }
    try {
        const payload = verifyAccessToken(token);
        req.userId = payload.sub;
        req.user = { id: payload.sub, role: payload.role }; // add this
        next()
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
module.exports = requireAuth;