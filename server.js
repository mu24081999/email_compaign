const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const app = express();
const session = require("express-session");
app.use(
  session({
    secret: "12345678",
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  const buildDir =
    req.hostname === "app.desktopcrm.com"
      ? "build"
      : req.hostname === "desktopcrm.com" && "build2";
  const buildPath = path.join(__dirname, buildDir);

  if (fs.existsSync(buildPath)) {
    express.static(buildPath)(req, res, next);
  } else {
    res.sendFile(path.join(__dirname, "maintainance.html"));
  }
});

app.get("*", (req, res, next) => {
  const buildDir = req.hostname === "app.desktopcrm.com" ? "build" : "build2";
  const buildPath = path.join(__dirname, buildDir);

  if (fs.existsSync(buildPath)) {
    if (
      req.hostname === "app.desktopcrm.com" &&
      !req.url.includes("/auth/google")
    ) {
      res.sendFile(path.join(buildPath, "index.html"));
    } else if (req.hostname === "desktopcrm.com") {
      res.sendFile(path.join(buildPath, "index.html"));
    } else {
      next();
    }
  } else {
    res.sendFile(path.join(__dirname, "maintainance.html"));
  }
});

const sslOptionsSub = {
  // key: fs.readFileSync(""),
  // cert: fs.readFileSync(""),
  // ca: fs.readFileSync(""),
  key: "",
  cert: "",
  ca: "",
};
// Start HTTPS server
https.createServer(sslOptionsSub, app).listen(443, () => {
  console.log("Server running...");
});
