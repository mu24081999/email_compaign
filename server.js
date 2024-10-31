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
    req.hostname === "localhost" ||
    req.hostname === "127.0.0.1" ||
    req.hostname === "146.190.175.199" ||
    req.hostname === "app.senderside.com"
      ? "build"
      : req.hostname === "senderside.com" && "build2";
  console.log("🚀 ~ app.use ~ buildDir:", buildDir);
  const buildPath = path.join(__dirname, buildDir);

  if (fs.existsSync(buildPath)) {
    express.static(buildPath)(req, res, next);
  } else {
    res.sendFile(path.join(__dirname, "maintainance.html"));
  }
});

const sslOptionsSub = {
  key: fs.readFileSync("senderside.key"),
  cert: fs.readFileSync("senderside_com.crt"),
  ca: fs.readFileSync("senderside_com.ca-bundle"),
  passphrase: "12345678",
};
// Start HTTPS server
https.createServer(sslOptionsSub, app).listen(443, (res) => {
  console.log("Server running...", res);
});
