const exp = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const _ = require("lodash");

let count = 0;
const users = [];

const app = exp();

function roundTo10(number) {
  return Math.round(number / 10) * 10;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(exp.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("login", {
    title: "Graphical Pass",
    btnText: "Login",
  });
});

app.get("/forgetPass", (req, res) => {
  res.render("forget", { title: "ForgetPass" });
});

app.get("/:topic", (req, res) => {
  const reqTitle = _.lowerCase(req.params.topic);
  if ("signup" === reqTitle) {
    res.render("signup", {
      title: "Account Creation",
      btnText: "Create account",
    });
  }
});

app.post("/signup", (req, res) => {
  const fName = req.body.fname;
  const lName = req.body.lname;
  const username = req.body.username;
  const email = req.body.mail;
  const spot1 = req.body.spot1;
  const spot2 = req.body.spot2;
  const spot3 = req.body.spot3;
  const spot4 = req.body.spot4;
  const newUser = {
    fname: fName,
    lname: lName,
    email: email,
    username: username,
    spot1X: roundTo10(Number(spot1.split(",")[0])),
    spot1Y: roundTo10(Number(spot1.split(",")[1])),
    spot2X: roundTo10(Number(spot2.split(",")[0])),
    spot2Y: roundTo10(Number(spot2.split(",")[1])),
    spot3X: roundTo10(Number(spot3.split(",")[0])),
    spot3Y: roundTo10(Number(spot3.split(",")[1])),
    spot4X: roundTo10(Number(spot4.split(",")[0])),
    spot4Y: roundTo10(Number(spot4.split(",")[1])),
  };
  users.push(newUser);
  // let num1=parseInt(newUser.spot1X);
  // console.log(newUser.spot1X);
  // console.log(typeof newUser.spot1X);
  console.log(users);
  res.render("newusertxt", { title: "NewUser" });
});

app.post("/forgetPass", (req, res) => {
  res.redirect("/");
});

app.post("/", (req, res) => {
  if (count > 2) {
    res.send(`
    <script>
      alert("Exceeded limits.Try after sometime.");
    </script>
  `);
  }
  const username = req.body.username;
  const spot1 = req.body.spot1;
  const spot1X = roundTo10(Number(spot1.split(",")[0]));
  const spot1Y = roundTo10(Number(spot1.split(",")[1]));
  const spot2 = req.body.spot2;
  const spot2X = roundTo10(Number(spot2.split(",")[0]));
  const spot2Y = roundTo10(Number(spot2.split(",")[1]));
  const spot3 = req.body.spot3;
  const spot3X = roundTo10(Number(spot3.split(",")[0]));
  const spot3Y = roundTo10(Number(spot3.split(",")[1]));
  const spot4 = req.body.spot4;
  const spot4X = roundTo10(Number(spot4.split(",")[0]));
  const spot4Y = roundTo10(Number(spot4.split(",")[1]));
  users.forEach((user,index) => {
    if (
      username === user.username &&
      spot1X === user.spot1X &&
      spot1Y === user.spot1Y &&
      spot2X === user.spot2X &&
      spot2Y === user.spot2Y &&
      spot3X === user.spot3X &&
      spot3Y === user.spot3Y &&
      spot4X === user.spot4X &&
      spot4Y === user.spot4Y
    ) {
      res.render("personalSite", { userName: user.fname.charAt(0).toUpperCase() + user.fname.slice(1)
      });
    } else {
      if(index+1==users.length){
        res.send(`
      <script>
        alert("Incorrect Spots.");
      </script>
      `);
      }
    }
  });
});

app.post("/newuser", (req, res) => {
  res.redirect("/");
});

app.post("/logout", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, console.log("Server started on port 3000"));
