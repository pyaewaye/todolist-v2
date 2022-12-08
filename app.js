require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const date = require(__dirname + "/date.js");

const app = express();

const PORT = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

app.set("view engine", "ejs");
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/todolistDB");
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.onxirkl.mongodb.net/todolistDB`);

const itemsSchema = {
  name: {
    type: String,
    required: [true, "Please fill in the item name"]
  }
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Meditation"
});
const item2 = new Item({
  name: "Coding"
});
const item3 = new Item({
  name: "Reading"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", (req, res) => {
  const day = date.getDate();
  Item.find({}, (err, foundItems) => {
    if (!err) {
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems, (err) => {
          if (!err) {
            console.log("Default items added successfully to the DB");
          }
        });
        res.redirect("/");
      } else {
        res.render("list", {
          listTitle: day,
          newListItems: foundItems
        });
      }
    }
  });
});

app.post("/", (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item ({
    name: itemName
  });
  if (listName === date.getDay()+",") {
    item.save();
    console.log("New item successfully added to the DB");
    res.redirect("/");
  } else {
    List.findOne({name:listName}, (err, foundList) => {
      if(!err){
        foundList.items.push(item);
        foundList.save();
        console.log("New item successfully added to the "+ listName + " list");
        res.redirect("/"+_.toLower(listName));
      }
    });
  }
});

app.post("/delete", (req,res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  if(listName===date.getDay()+","){
    Item.findByIdAndRemove(checkedItemId, (err) => {
      if(!err){
        console.log("Selected item successfully removed from the DB");
      }
      res.redirect("/");
    });
  }else {
    //Find the custom list by listName and update the items array by pull-ing the checked item by _id from the array.
    //({condition},{update},callback)
    List.findOneAndUpdate({name:listName}, {$pull:{items:{_id:checkedItemId}}}, (err,foundList) => {
      if(!err){
        console.log("Selected Item successfully removed from the "+listName+" list");
        res.redirect("/"+listName);
      }
    });
  }
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, (err, foundList) => {
    if(!err){
      if(!foundList){
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/"+_.toLower(customListName));
      }else {
        //Show an existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
