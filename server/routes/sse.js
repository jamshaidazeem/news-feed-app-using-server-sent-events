const express = require("express");
const router = express.Router();
const helper = require("../helper");
const constants = require("../constants");

router.get("/", async (req, res, next) => {
  // set below header on response to establish SSE
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  // write any logic to start sending events
  setInterval(() => {
    res.write(
      helper.serializeEvent(
        constants.SSE_EVENT_TYPE_MSG,
        `${new Date().toLocaleTimeString()}`
      )
    );
    res.write(
      helper.serializeEvent(
        constants.SSE_EVENT_TYPE_NEWS,
        `${new Date().toLocaleTimeString()}`
      )
    );
  }, 1000);
});

module.exports = router;
