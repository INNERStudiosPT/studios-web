// Grafana Faro: front-end errors, console errors, web vitals and sessions.
//
// Next.js runs this file once in the browser, after the HTML loads and before
// React hydrates, so errors thrown during hydration are already captured.
//
// Events go to the Alloy faro.receiver at faro.innerstudios.pt and land in Loki
// as {job="faro", app="studios"}. There is no tracing backend, so tracing is
// deliberately not enabled (it lives in @grafana/faro-web-tracing, not installed).
import {
  getWebInstrumentations,
  initializeFaro,
  LogLevel,
  type TransportItem,
} from "@grafana/faro-web-sdk";

import { stripQueries } from "./lib/faroScrub";

const DEFAULT_FARO_URL = "https://faro.innerstudios.pt/collect";

// Noise that is not ours to fix: browser extensions and the benign
// ResizeObserver loop warning that Chrome reports as an error.
const IGNORE_ERRORS: Array<string | RegExp> = [
  /ResizeObserver loop/i,
  /chrome-extension:\/\//i,
  /moz-extension:\/\//i,
  /safari-(web-)?extension:\/\//i,
  // Faro matches against "message name stack", so anchor on the start only.
  /^Script error\.?\s/i,
];

// No query strings or fragments in any URL we send (see lib/faroScrub).
function scrub(item: TransportItem): TransportItem {
  return { ...item, meta: stripQueries(item.meta), payload: stripQueries(item.payload) };
}

const url = process.env.NEXT_PUBLIC_FARO_URL || DEFAULT_FARO_URL;
const environment =
  process.env.NEXT_PUBLIC_FARO_ENVIRONMENT || process.env.NODE_ENV;

// Off in `next dev` unless a collector is set explicitly, so local work does
// not end up in production Loki.
const enabled =
  process.env.NODE_ENV !== "development" || !!process.env.NEXT_PUBLIC_FARO_URL;

if (enabled) {
  try {
    initializeFaro({
      url,
      app: {
        name: "studios",
        version: process.env.NEXT_PUBLIC_APP_VERSION,
        environment,
      },
      instrumentations: getWebInstrumentations({ captureConsole: true }),
      consoleInstrumentation: {
        // Capture console.error only.
        disabledLevels: [
          LogLevel.TRACE,
          LogLevel.DEBUG,
          LogLevel.LOG,
          LogLevel.INFO,
          LogLevel.WARN,
        ],
      },
      sessionTracking: { enabled: true },
      ignoreErrors: IGNORE_ERRORS,
      trackGeolocation: false,
      beforeSend: scrub,
    });
  } catch {
    // Monitoring must never break the site.
  }
}
