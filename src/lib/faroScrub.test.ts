import { describe, expect, it } from "vitest";
import { stripQueries, stripUrlQuery } from "./faroScrub";

describe("stripUrlQuery", () => {
  it("drops search and hash from a whole URL", () => {
    expect(stripUrlQuery("https://innerstudios.pt/contact?email=ana%40example.test#form")).toBe(
      "https://innerstudios.pt/contact",
    );
  });

  it("drops a query that contains parentheses", () => {
    expect(
      stripUrlQuery("https://example.test/?utm_campaign=(verao)&email=ana%40example.test"),
    ).toBe("https://example.test/");
  });

  it("drops queries from URLs embedded in a stack trace", () => {
    const stack = "Error: boom\n  at f (https://innerstudios.pt/?token=abc#x:1:2)\n  at g (https://innerstudios.pt/_next/static/chunks/a.js:3:4)";
    const out = stripUrlQuery(stack);
    expect(out).not.toContain("token=abc");
    expect(out).toContain("https://innerstudios.pt/_next/static/chunks/a.js:3:4");
  });

  it("leaves URLs without a query alone", () => {
    expect(stripUrlQuery("https://innerstudios.pt/faq")).toBe("https://innerstudios.pt/faq");
    expect(stripUrlQuery("plain text")).toBe("plain text");
  });
});

describe("stripQueries", () => {
  it("walks nested objects and arrays", () => {
    const item = {
      meta: { page: { url: "https://innerstudios.pt/?email=a%40b.c" } },
      payload: { stacktrace: { frames: [{ filename: "https://innerstudios.pt/?email=a%40b.c", lineno: 1 }] } },
    };
    const out = stripQueries(item);
    expect(out.meta.page.url).toBe("https://innerstudios.pt/");
    expect(out.payload.stacktrace.frames[0]).toEqual({ filename: "https://innerstudios.pt/", lineno: 1 });
    expect(JSON.stringify(out)).not.toContain("a%40b.c");
  });
});
