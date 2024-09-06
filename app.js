const express = require("express");
 const app = express();
 const path = require("path");
 const router = express.Router();


 const xhr = require('xhr2');

// Configuración de la solicitud
var url = 'https://apiv1.anzencode.com/instance/connect/';
const method = 'GET';


// Realizamos la solicitud

 
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
 
router.get("/api/:instance", (req, res) => {

console.log(req.params.instance)

 // console.log(urlfinal)
const urlfinal = url + req.params.instance

async function fetchMoviesJSON() {

  const response = await fetch(urlfinal,{method: 'GET',
    // body: JSON.stringify(data),
     headers: { 'Content-Type': 'application/json',
       'apikey': req.params.instance
      }}
 )
  const movies = await response.json();
  return movies.base64;
}

fetchMoviesJSON().then(movies => {
  movies; // fetched movies
  //console.log(movies)
  res.render("index",{base64: movies});
});

 


});
 
router.get("/about", (req, res) => {
res.render("about", { title: "Hey", message: "Hello there!" });
});
 
app.use("/", router);
app.listen(process.env.port || 3000);
 
console.log("Running at Port 3000");