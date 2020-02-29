import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://d084538ed59a42d6992b42328f29a31c@sentry.io/2968598"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
