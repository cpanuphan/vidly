import Raven from "raven-js";

function init() {
  Raven.config("https://24a7e20105654990951337cd219adfe0@sentry.io/1809463", {
    release: "1-0-0",
    environment: "development-test"
  }).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log
};
