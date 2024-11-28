// const express = require("express");
// const https = require("https");
// const fs = require("fs");
// const path = require("path");
// const app = express();
// const session = require("express-session");
// const compression = require("compression");
// app.use(compression());

// app.use(
//   session({
//     secret: "12345678",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use((req, res, next) => {
//   console.log(req.hostname);
//   const buildDir =
//     req.hostname === "localhost" ||
//     req.hostname === "127.0.0.1" ||
//     req.hostname === "146.190.175.199" ||
//     req.hostname === "app.senderside.com"
//       ? "build"
//       : req.hostname === "senderside.com" && "build2";
//   const buildPath = path.join(__dirname, buildDir);

//   if (fs.existsSync(buildPath)) {
//     express.static(buildPath, {
//       maxAge: "1y", // Cache static files for 1 year
//       immutable: true, // Indicate files won't change
//     })(req, res, next);
//   } else {
//     res.sendFile(path.join(__dirname, "maintainance.html"));
//   }
// });
// // Serve index.html for any routes not matched by static files
// app.get("*", (req, res) => {
//   const buildDir =
//     req.hostname === "localhost" ||
//     req.hostname === "127.0.0.1" ||
//     req.hostname === "146.190.175.199" ||
//     req.hostname === "app.senderside.com"
//       ? "build"
//       : req.hostname === "127.0.0.1" && "build2";
//   const buildPath = path.join(__dirname, buildDir, "index.html");

//   if (fs.existsSync(buildPath)) {
//     res.sendFile(buildPath);
//   } else {
//     res.status(404).send("Maintenance Page Not Found");
//   }
// });
// //Force https
// app.use((req, res, next) => {
//   if (!req.secure && req.get("x-forwarded-proto") !== "https") {
//     return res.redirect("https://" + req.headers.host + req.url);
//   }
//   next();
// });

// const sslOptionsSub = {
//   key: fs.readFileSync("senderside.key"),
//   cert: fs.readFileSync("senderside_com.crt"),
//   ca: fs.readFileSync("senderside_com.ca-bundle"),
//   passphrase: "12345678",
// };
// // Start HTTPS server
// https.createServer(sslOptionsSub, app).listen(443, (res) => {
//   console.log("Server running...", res);
// });
const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": [
        "'self'",
        "'unsafe-inline'",
        "https://your-backend-url.com",
      ],
      "style-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "data:"],
      "connect-src": ["'self'", "https://your-backend-url.com"],
    },
  })
);
app.use(compression());
app.use(morgan("combined"));

app.use((req, res, next) => {
  if (!req.secure && req.get("x-forwarded-proto") !== "https") {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
});

function getBuildDirectory(hostname) {
  const buildDirectories = {
    localhost: "build",
    "127.0.0.1": "build",
    "146.190.175.199": "build",
    "app.senderside.com": "build",
    "senderside.com": "build2",
  };
  return buildDirectories[hostname] || null;
}

app.use((req, res, next) => {
  const buildDir = getBuildDirectory(req.hostname);
  if (buildDir) {
    const buildPath = path.join(__dirname, buildDir);
    if (fs.existsSync(buildPath)) {
      express.static(buildPath, {
        maxAge: "1y",
        immutable: true,
      })(req, res, next);
      return;
    }
  }
  res.sendFile(path.join(__dirname, "maintainance.html"));
});

app.get("*", (req, res) => {
  const buildDir = getBuildDirectory(req.hostname);
  if (buildDir) {
    const buildPath = path.join(__dirname, buildDir, "index.html");
    if (fs.existsSync(buildPath)) {
      return res.sendFile(buildPath);
    }
  }
  res.status(404).send("Maintenance Page Not Found");
});

let sslOptionsSub;
try {
  sslOptionsSub = {
    key: fs.readFileSync("senderside.key"),
    cert: fs.readFileSync("senderside_com.crt"),
    ca: fs.readFileSync("senderside_com.ca-bundle"),
    passphrase: "12345678",
  };
} catch (error) {
  console.error("Failed to load SSL certificates:", error.message);
  process.exit(1);
}

https.createServer(sslOptionsSub, app).listen(443, () => {
  console.log("Server running on port 443...");
});

process.on("SIGINT", () => {
  console.log("Server shutting down gracefully...");
  process.exit(0);
});
