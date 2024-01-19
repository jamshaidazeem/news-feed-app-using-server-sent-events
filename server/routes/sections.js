const express = require("express");
const router = express.Router();
const axios = require("axios");
const constants = require("../constants");

router.get("/", async (req, res, next) => {
  const url = `${constants.BASE_URL}/section-list.json`;
  const options = { params: { [constants.API_KEY]: constants.API_KEY_VAL } };

  try {
    const rawResponse = await axios.get(url, options);
    const apiResponse = rawResponse.data;
    if (apiResponse && apiResponse.status && apiResponse.status === "OK") {
      res.status(200).json(apiResponse);
    } else {
      throw new Error("Processing error in request");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
