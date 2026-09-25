# Mission 3: Console attack, forge the status feed

## Before: an honest Refresh

Real feed, some services not up, 7 rejected:

![honest feed](img/m3-before.png)

## After: my cover-up

Every service UP / ONLINE, 0 rejected:

![forged feed](img/m3-after.png)

Portal still shows everything up during a simulated HTTP 503 outage:

![green during outage](img/m3-outage.png)

## My attack script

Paste the full contents of `attacks/m3_coverup.js`:

```js
// =====================================================================
// MISSION 3 ATTACK: Cover up the outage
// =====================================================================
// Write your attack here, then COPY the whole file and PASTE it into the
// DevTools Console of http://localhost:3000. Then click Refresh.
//
// Start from the worked example in examples/m3_case_fetch_spy.js.
//
// Author:
// =====================================================================

  // TODO R1: replace window.fetch; requests that are not /api/status must pass through untouched.
  // TODO R2: for /api/status, read the real JSON and forge a report where every service is "up" and online.
  // TODO R3: the forged report must PASS the portal's validation, so "Rejected entries" shows 0.
  // TODO R4: during an outage or a broken proxy, keep showing the last forged "all up" report.
  // TODO R5: expose window.__restoreFetch() that puts the real fetch back.

(() => {
  const realFetch = window.fetch;
  let lastForged = null;


  window.fetch = async function(url, options) {

    if (!url.toString().includes("/api/status")) {
      return realFetch(url, options);
    }

    try {
      const response = await realFetch(url, options);


      if (!response.ok) {
        return new Response(JSON.stringify(lastForged), {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }

      const data = await response.json();
      const forgedServices = [];


      for (const item of data.services) {
        const valid = normalizeService(item);

        if (valid !== null) {
          forgedServices.push({
            name: valid.name,
            status: "up",
            online: true,
            latencyMs: valid.latencyMs
          });
        }
      }

      const forged = {
        services: forgedServices
      };

      lastForged = forged;

      return new Response(JSON.stringify(forged), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });

    } catch (error) {


      return new Response(JSON.stringify(lastForged), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  };


  window.__restoreFetch = function() {
    window.fetch = realFetch;
  };

  console.log("[attack] cover-up installed");
})();
```

## Questions

1. Can `window.fetch` be replaced by code running in the page? How did you confirm it, and why does that break every client-side security assumption?

    Yes, `window.fetch` can be replaced by code running in the page. I put the function I created and the portal received my forged response. 

2. The real feed contains a `null` entry and other junk. What did your `map` do so it would not crash on those, and still produce a report that passes the portal's validator?

   My code checked each service with normalizeService(). If the result was not null, it added the service and changed its status to "up" and online to true.

3. The portal used `textContent` and validated its data, yet you still fooled it. Name the single assumption the portal made that was false.

   The portal thought the data it received from fetch() could be trusted. 

## Async order: predict, then verify

**My prediction, written before running anything:**

> Does `await realFetch(...)` finish before or after `loadStatus` hands control back to the click handler? 
I predict that loadStatus will give control back to the click handler before await realFetch(...) since fetch() is asynchronous.

**What the console actually showed:**

```
[attack] cover-up installed
Before realFetch
After realFetch
```

**Explanation, using single-threaded, non-blocking, and event loop:**

Since Java Script is single threaded and fetch () is non-blocking, it doesn't need to stop everything while waiting. The event loops allows it to continue after await response is ready.

## Stretch goal, optional

> Leave empty if not attempted.

## Documentation log

| Page I used, with URL | One thing I learned from it |
|https://developer.mozilla.org/en-US/docs/Web/API/Response/Response|I learned how to create a new Response and set its status and headers|
| | |
