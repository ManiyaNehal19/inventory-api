const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const ACCESS_TOKEN_EXPIRY = "15m"
const REFRESH_TOKEN_EXPIRY = "7d"

if(!ACCESS_TOKEN_EXPIRY || !REFRESH_TOKEN_EXPIRY){
    throw new Error("JWT secrets are not set in enviornment");
}

function generateAccessToken(user){
    // console.log(user)
    return jwt.sign({sub: user._id.toString(), email: user.email}, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRY});
}
function generateRefreshToken(user){
    return jwt.sign({sub: user._id.toString()}, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRY});
}
function verifyAccessToken(token){
    return jwt.verify(token, ACCESS_TOKEN_SECRET)
}
function verifyRefreshToken(token){
    return jwt.verify(token, REFRESH_TOKEN_SECRET)
}

module.exports = {
    generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken
}