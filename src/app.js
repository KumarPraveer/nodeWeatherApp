const getCurrentWeather = require("../src/utils/weatherdata");
const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewPath);

hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Praveer Kumar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Praveer Kumar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Praveer Kumar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  getCurrentWeather(req.query.address)
    .then(({ weatherDesc, location, country, currentTemp }) => {
      res.send({
        forecase: weatherDesc[0],
        location: location,
        country: country,
        currentTemp: currentTemp,
      });
    })
    .catch((error) => {
      res.send({
        error: "Unable to find location. Try another search.",
      });
    });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    text: "Page not Found!",
    name: "Praveer Kumar",
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
