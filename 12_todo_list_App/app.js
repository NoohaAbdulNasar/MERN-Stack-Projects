const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const username = 'NoohaAbdulNasar';
const password = 'Nooha123';
const dbName = 'todolistDB';

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin',
  user: username,
  pass: password,
};

mongoose.connect(`mongodb+srv://${username}:${password}@todolistappcluster.12ed2fx.mongodb.net/${dbName}`, dbOptions)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

const itemsSchema = {
  name: String,
};

const categorySchema = {
  name: String,
};

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const Item = mongoose.model("Item", itemsSchema);
const Category = mongoose.model("Category", categorySchema);
const List = mongoose.model("List", listSchema);

const defaultCategories = [
  { name: "Home" },
  { name: "College" },
  { name: "Work" },
];

app.get("/", async (req, res) => {
  const foundCategories = await Category.find({});
  res.render("frontPage", { categories: foundCategories });
});

app.get("/about", async (req, res) => {
  const foundCategories = await Category.find({});
  res.render("about", { categories: foundCategories });
});

app.get("/categories", async (req, res) => {
  try {
    let foundCategories = await Category.find({});

    if (foundCategories.length === 0) {
      await Category.insertMany(defaultCategories);
      console.log("Successfully saved default items to DB.");
      foundCategories = await Category.find({});
    }
    res.render("categories", { categories: foundCategories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/categories", async (req, res) => {
  const categoryName = req.body.newCategory;
  const category = new Category({
    name: categoryName,
  });

  if (categoryName) {
    try {
      await category.save();
      defaultCategories.push(category);
    } catch (err) {
      console.error(err);
    }
    res.redirect("/categories");
  }
});

app.post("/delete/:categoryName", async (req, res) => {
  const categoryId = req.body.categoryId;
  const categoryName = req.body.categoryName;
  try {
    await Category.findByIdAndRemove(categoryId);
    console.log(`Successfully deleted ${categoryName} from category.`);
  } catch (err) {
    console.error(err);
  }
  res.redirect("/categories");
});

app.get("/categories/:customListName", async (req, res) => {
  const customListName = _.capitalize(req.params.customListName);
  const foundCategories = await Category.find({});
  try {
    let foundList = await List.findOne({ name: customListName });

    if (!foundList) {
      const list = new List({
        name: customListName,
        items: [],
      });

      await list.save();
      foundList = list;
    }

    res.render("list", {
      listTitle: foundList.name,
      newListItems: foundList.items,
      categories: foundCategories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/categories/:customListName", async (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  });

  try {
    let foundList = await List.findOne({ name: listName });
    foundList.items.push(item);
    await foundList.save();
    res.redirect("/categories/" + listName);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/categories/delete/:customListName", async (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  try {
    const foundList = await List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      { new: true }
    );
    console.log(`Successfully deleted checked items from ${listName}.`);
    res.redirect("/categories/" + listName);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});