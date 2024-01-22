var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var sectionsRouter = require("./routes/sections");
var serverSiteEventsRouter = require("./routes/sse");

var app = express();

app.use(cors()); // all origins
/* app.use( // specific origins
   cors({
     origin: ["http://localhost:4200"],
   })
 ); */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/sections", sectionsRouter);
app.use("/sse", serverSiteEventsRouter);

module.exports = app;
