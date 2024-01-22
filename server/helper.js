/**
 * SSE message serializer
 * @param event: Event name
 * @param data: Event data
 */
const serializeEvent = (event, data) => {
  const jsonString = JSON.stringify(data);
  // below format should be used for proper SSE delivery
  return `event: ${event}\ndata: ${jsonString}\n\n`;
};

module.exports = {
  serializeEvent,
};
