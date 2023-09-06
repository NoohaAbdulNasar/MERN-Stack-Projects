const express = require("express");
const qr = require("qr-image");
const fs = require("fs");
const validUrl = require("valid-url");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { qrCodeData: "", error: "" }); // Pass an error message
});

app.post("/", (req, res) => {
  const url = req.body.URL;
  
  if (!validUrl.isUri(url)) {
    res.render("index", { qrCodeData: "", error: "Invalid URL. Please enter a valid URL." });
    return;
  }

  const qr_code = qr.image(url, { type: "png" });
  qr_code.pipe(fs.createWriteStream("public/qr_img.png"));

  fs.writeFile("public/URL.txt", url, (err) => {
    if (err) throw err;
    res.render("index", { qrCodeData: url, error: "" }); // Clear the error message
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});