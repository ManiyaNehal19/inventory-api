const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
// const saltround = 12;
const crypto = require("crypto")
const SALT_ROUNDS = 12
class User{
    static async register(username, email, password, role){
        const existing = await UserModel.findOne({ email });
        if (existing) {
        const err = new Error("Email already in use");
        err.statusCode = 409;
        throw err;
        }
        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await UserModel.create({ username, email, password: hash, role:role });
        return this.#sanitize(user);
        
    }
    static async login(email, userpassword){
        
        // console.log(email)
        const user = await UserModel.findOne({email: email});
        
        if(!user){
            const err =  new Error("User not found")
            err.statusCode = 401
            return err;
        }
        const {password} = user
        const iscorrect = await bcrypt.compare(userpassword, password);
        if(!iscorrect){
            const err =  new Error("Password is incorrect")
            err.statusCode = 401
            return err;
        }
        return this.#sanitize(user);
    }
    static async saveRefreshToken(email, refreshtoken){
        const tokenhash = crypto.createHash("sha256").update(refreshtoken).digest("hex")
        await UserModel.findOneAndUpdate({email:email}, {refreshtokenhash: tokenhash})
    }
    static async verifyrefreshtoken(userId, refreshtoken){

        const user = await UserModel.findById(userId).select("+refreshtokenhash");

    if (!user || !user.refreshtokenhash) return false;
    const tokenHash = crypto.createHash("sha256").update(refreshtoken).digest("hex");

    return tokenHash == user.refreshtokenhash;

    }
    static async clearRefreshToken(email){
        await UserModel.findOneAndUpdate({email:email}, {refreshtokenhash: null});
    }
    static #sanitize(user){
        const obj = user.toObject ? user.toObject(): user;
        delete obj.password;
        delete obj.refreshtokenhash;
        return obj;
    }

}
module.exports = User;