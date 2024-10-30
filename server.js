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
  console.log(req.hostname);
  const buildDir =
    req.hostname === "127.0.0.1" ||
    req.hostname === "146.190.175.199" ||
    req.hostname === "emailrightaway.com"
      ? "build"
      : req.hostname === "desktopcrm.com" && "build2";
  console.log("🚀 ~ app.use ~ buildDir:", buildDir);
  const buildPath = path.join(__dirname, buildDir);

  if (fs.existsSync(buildPath)) {
    express.static(buildPath)(req, res, next);
  } else {
    res.sendFile(path.join(__dirname, "maintainance.html"));
  }
});

const sslOptionsSub = {
  key: fs.readFileSync("desktopcrm.key"),
  cert: fs.readFileSync("desktopcrm_com.crt"),
  ca: fs.readFileSync("desktopcrm_com.ca-bundle"),
};
// Start HTTPS server
https.createServer(sslOptionsSub, app).listen(443, () => {
  console.log("Server running...");
});
