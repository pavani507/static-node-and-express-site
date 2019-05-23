const express = require("express");
const app = express();
var path = require("path");
const data = require("./data.json");
const projects = data.projects;

app.set("view engine", "pug");

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/projects/static/img", express.static(path.join(__dirname, "img")));
app.use(
  "/projects/static/css",
  express.static(path.join(__dirname, "public/css"))
);
app.use(
  "/projects/static/js",
  express.static(path.join(__dirname, "public/js"))
);

//Configure index route to render "Home" page
app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = projects[id];

  if (isNaN(id) || id > projects.length) {
    return res.redirect("/");
  }
  res.render("project", { project });
});

app.listen(3000, () => {
  console.log("running on localhost:3000");
});
