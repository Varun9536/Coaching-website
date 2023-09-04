const express = require("express")
const fs = require("fs")
// bodyparser is middleware , lekin abhi hamne use nahikiya hai
// const bodyparser = require("body-parser"); 

const path = require("path")
const app = express()
const port = 80
// mongoose and mongodb

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactform')

// scheme
const formSchema = new mongoose.Schema({
    name: String,
    gender: String,
    email: String,
    contact: String,
    address: String
});

const form = mongoose.model('form', formSchema);




app.use("/static", express.static("static"))

app.set("view engine", "pug")

app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded())


app.get("/", (req, res) => {
    const params = {}
    res.status(200).render("home.pug", params)
})


app.get("/contact", (req, res) => {
    res.status(200).render("contact.pug")
})


app.post("/contact", (req, res) => {
    var myData = new form(req.body);

    myData.save().then(() => {
        res.status(200).render("submit.pug")
    }).catch(() => {
        res.status(200).send(" form submission failed")
    })

    
})


app.listen(port, () => {
    console.log("server started at port 80")
})