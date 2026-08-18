const Userclass = require("../services/auth.services");
const {generateAccessToken, generateRefreshToken, verifyRefreshToken} = require("../utils/token.utils")
const { accessTokenCookie, refreshTokenCookie} = require("../utils/cookies.utils")
const z = require("zod")
const {registerSchema, loginSchema} = require("../validators/auth.validators")
exports.register = async (req, res,next)=>{
    try {
        const {username, email, password, role} = req.body;   
        const regitereduser = await Userclass.register(username, email, password, role);
        res.status(200).json({message: "User registered successfully", regitereduser})
    } catch (error) {
        next(error)
    }
}
exports.login = async (req, res, next) =>{
   try {
        const {email, password} = req.body;
        const loginuser = await Userclass.login(email, password);
        const accessToken = generateAccessToken(loginuser)
        const refreshToken = generateRefreshToken(loginuser);
        await Userclass.saveRefreshToken(email, refreshToken);
        res.cookie("accessToken", accessToken, accessTokenCookie)
        res.cookie("refreshToken", refreshToken, refreshTokenCookie)
        res.status(200).json({message: "User logged in successfully", loginuser})
    } catch (error) {
        next(error)
    }
}

exports.refresh = async(req, res) =>{
    try {
        const token = req.cookies?.refreshToken
        if(!token){
            return res.status(401).json({ error: "No refresh token provided" });
        }
        const payload = verifyRefreshToken(token);
    
        const isValid = await Userclass.verifyrefreshtoken(payload.sub, token);
      
        if(!isValid){
            
            return res.status(401).json({ error: "Invalid refresh token" });
        }

        const newAccessToken = generateAccessToken({_id: payload.sub, email: payload.email })
        res.cookie("accessToken", newAccessToken , accessTokenCookie)

        res.status(200).json({ message: "Token refreshed" });
    } catch (error) {
        console.error("Refresh error:", error.name, error.message);
        res.status(401).json({ error: "Invalid or expired refresh token" });
    }
}
exports.logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      const payload = verifyRefreshToken(token);
      await Userclass.clearRefreshToken(payload.sub);
    }
  } catch (_) {
    // token already invalid/expired — nothing to clean up server-side
  } finally {
    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("refreshToken", { path: "/auth/refresh" });
    res.status(200).json({ message: "Logged out successfully" });
  }
};