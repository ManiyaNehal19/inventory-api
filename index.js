
require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require("./config/db");
const productrouter = require("./routes/product.router");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/product', productrouter);

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


