const express = require("express");
const bodyParser = require("body-parser");
const port = 8080;
const mongoose = require("mongoose");
const app = express();
var items = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

mongoose.connect("mongodb+srv://admin-thaksin:AQS0dVydIEe5PKdV@cluster0.dkowvdw.mongodb.net/todolistDB");

const itemSchema = new mongoose.Schema({
    item : String
});

const Item = mongoose.model("todolistItem", itemSchema);

const item1 = new Item({
    item : "Welcom to TodoList website"
});

const item2 = new Item({
    item : "Hit the + to add your new list"
});

const item3 = new Item({
    item : "Hit the checkboc to delete your list"
});

const defaultItems = [item1, item2, item3];

app.get("/", (req, res)=>{
    const today = new Date();
    const options = {
        weekday : "long",
        month : "long",
        day : "numeric"
    };
    Item.find({}).then((value) => {
        if(value.length === 0){
            Item.insertMany(defaultItems);
        }
        res.render("index", {ThisDay : today.toLocaleDateString("en-US", options), newListItem : value});
    })
    
});

app.post("/", (req, res)=>{
    var item = new Item({
        item : req.body.newList
    })
    item.save()
    res.redirect("/");
})

app.post("/delete", (req, res)=>{
    const itemId = req.body.checkbox;
    Item.deleteOne({ _id : itemId}).then(() =>{
        res.redirect("/");
    })
})
app.listen(process.env.PORT  || port, ()=>{
    console.log(`server started at port ${port}`);
});