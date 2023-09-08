import express from "express";
import axios from "axios";

const app= express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get("/", async(req, res)=>{
    try {
        const categoriesList = await axios.get("https://v2.jokeapi.dev/categories");
        res.render("categories.ejs", {
            categoriesList: categoriesList.data.categories
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.post('/submit', async (req, res) => {
    try {
        const category = req.body.category;
        console.log(`Received a POST request with category: ${category}`);
    
        // Fetch a joke based on the category
        const jokeCategory = await axios.get(`https://v2.jokeapi.dev/joke/${category}//safe-mode`);
    
        // Check if the response contains a valid joke
        if (jokeCategory.data.error === false) {
          if (jokeCategory.data.type === 'single') {
            let jokeType = 'single';
            res.render("joke.ejs", { jokeType, joke: jokeCategory.data.joke });
          } else if (jokeCategory.data.type === 'twopart') {
            let jokeType = 'twopart';
            const setup = jokeCategory.data.setup;
            const delivery = jokeCategory.data.delivery;
            res.render("joke.ejs", { jokeType, setup, delivery });
          } else {
            res.status(404).send('Invalid joke type.');
          }
        } else {
          // Handle the case where there's an error or no valid joke for the selected category
          res.status(404).send('No valid joke found for this category.');
        }
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error('Error:', error.message);
        res.status(500).send('An error occurred while fetching the joke.');
      }
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
