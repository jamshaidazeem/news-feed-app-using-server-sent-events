const API_KEY = "api-key";
const API_KEY_VAL = "A4Zfvt4AEMfU1ULjkC4ginTzcwzL2YNf";
const BASE_URL = "https://api.nytimes.com/svc/news/v3/content";
const SSE_EVENT_TYPE_MSG = "message"; // default event source type
const SSE_EVENT_TYPE_NEWS = "news"; // custom event source type
const SSE_EVENT_TYPE_ALL_SENT = "allSent"; // custom event source type

module.exports = {
  API_KEY,
  API_KEY_VAL,
  BASE_URL,
  SSE_EVENT_TYPE_MSG,
  SSE_EVENT_TYPE_NEWS,
  SSE_EVENT_TYPE_ALL_SENT,
};
