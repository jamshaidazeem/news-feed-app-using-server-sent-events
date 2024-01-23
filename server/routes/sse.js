const express = require("express");
const router = express.Router();
const helper = require("../helper");
const constants = require("../constants");
const axios = require("axios");

var sseResponse;
var sectionDetailsArr = [];

router.get("/", async (req, res) => {
  // set below header on response to establish SSE
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  // store res ref to use in other functions
  sseResponse = res;
  getSectionDetails(req.url.split("=")[1]); // extract section from url
});

const getSectionDetails = async (section) => {
  const url = `${constants.BASE_URL}/nyt/${section}.json`;
  const options = { params: { [constants.API_KEY]: constants.API_KEY_VAL } };

  try {
    const rawResponse = await axios.get(url, options);
    const apiResponse = rawResponse.data;
    if (apiResponse && apiResponse.status && apiResponse.status === "OK") {
      populateSectionDetailsArr(apiResponse.results);
      sendSectionsResultsInEvents();
    } else {
      sendRespInCaseOfAnError();
    }
  } catch (error) {
    sendRespInCaseOfAnError();
  }
};

const populateSectionDetailsArr = (apiRecords) => {
  sectionDetailsArr = [];
  apiRecords.map((record) => {
    const { section, subsection, title, abstract, published_date, multimedia } =
      record;
    sectionDetailsArr.push({
      section,
      subsection,
      title,
      abstract,
      published_date,
      multimedia,
      isSent: false,
    });
  });
};

const sendSectionsResultsInEvents = async () => {
  let timeout = setTimeout(() => {
    const recordForEvent = sectionDetailsArr.find((v) => v.isSent === false);
    if (recordForEvent) {
      recordForEvent.isSent = true;
      sseResponse.write(
        helper.serializeEvent(
          constants.SSE_EVENT_TYPE_NEWS,
          `${JSON.stringify(recordForEvent)}`
        )
      );
      sendSectionsResultsInEvents();
    } else {
      // all events sent
      sseResponse.write(
        helper.serializeEvent(
          constants.SSE_EVENT_TYPE_NEWS,
          constants.SSE_EVENT_TYPE_ALL_SENT
        )
      );
      clearTimeout(timeout);
    }
  }, 1000);
};

const sendRespInCaseOfAnError = async () => {
  sseResponse.write(helper.serializeEvent(constants.SSE_EVENT_TYPE_NEWS, ``));
};

module.exports = router;
