const express = require('express');
const app = express()
PORT = process.env.PORT
app.get("/", (req,res)=>{
    res.send("Hello, Express")
});
app.listen(PORT, ()=>{
    console.log(`Server is runnng on http://localhost:${PORT}`)
});
//get route with status code
app.get("/home", (req,res)=>{
    res.status(200).send("Welcome Home")
})
//get route with custome html
app.get("/room", (req,res)=>{
    res.set('Content-Type', "text/html");
    res.status(200).send("<h4>Hello Room, wassup.</h4>")
})
//post route
app.post("/submit", (req,res)=>{
    res.send("Form submitted")
})


