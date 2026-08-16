
require('dotenv').config();
const express = require('express');
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();
const connectDB = require("./config/db");
const productrouter = require("./routes/product.router");
const authrouter = require("./routes/auth.rouer")
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
const authLimiter = rateLimit({
    windowMs: 15*60*1000,
    max: 20,
    message: {error: "Too many attempts, please try again later"}
})
app.use("/auth/register", authLimiter);
app.use("/auth/login", authLimiter)
app.use('/product', productrouter);
app.use('/auth', authrouter );
app.use((err, req, res, next)=>{
    console.error(err);
    const statuscode = err.statusCode || 500;
    res.status(statuscode).json({
        error: statuscode===500? "Something went wrong":err.message
    });
});


app.get("/", (req, res) => {
    res.send("Hello, Express");
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to start server:', err);
    });
//get route with status code
// app.get("/home", (req,res)=>{
//     res.status(200).send("Welcome Home")
// })
// //get route with custome html
// app.get("/room", (req,res)=>{
//     res.set('Content-Type', "text/html");
//     res.status(200).send("<h4>Hello Room, wassup.</h4>")
// })
// //post route
// app.post("/submit", (req,res)=>{
//     res.send("Form submitted")
// })


