const express = require("express");
const body = require("body-parser");
const bodyParser = require("body-parser");
const port = 8080;
const app = express();

var items = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get("/", (req, res)=>{
    const today = new Date();
    const options = {
        weekday : "long",
        month : "long",
        day : "numeric"
    };

    res.render("index", {ThisDay : today.toLocaleDateString("en-US", options), newListItem : items});
});

app.post("/", (req, res)=>{
    var item = req.body.newList;
    items.push(item);
    res.redirect("/");
})

app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
});