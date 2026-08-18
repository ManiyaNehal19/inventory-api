const z = require("zod")

const registerSchema = z.object({
    "username": z.string().min(3).max(30),
    "email": z.email(),
    "password": z.string().min(8),
    "role": z.enum(["admin", "user"])
}).strict() 

const loginSchema =  z.object({
    "email": z.string().email(),
    "password": z.string().min(8)
}).strict() 
module.exports = {registerSchema, loginSchema}