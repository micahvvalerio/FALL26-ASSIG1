// =====================================================================
// MISSION 2 ATTACK: The Runaway Button
// =====================================================================
// Write your attack here, then COPY the whole file and PASTE it into the
// DevTools Console of http://localhost:3000.
//
// Everything is wrapped in (() => { ... })(); on purpose. It is an
// immediately invoked function: it lets you paste the script again after
// a page reload without "Identifier has already been declared" errors.
//
// Author:
// =====================================================================

(() => {
  const zone = document.getElementById("danger-zone");
  const original = document.getElementById("purge-btn");

  // TODO R1: remove the portal's legitimate click listener.
  // TODO R2: stop keyboard users from reaching the button.
  // TODO R3: make the button jump inside zone on every approach, no overlap.
  // TODO R4: create a NEW element that shows the dodge counter.
  // TODO R5: your creative twist.

  if (!zone || !original) {
    console.log("[attack] missing critical elements");
    return;
  }

  original.replaceWith(original.cloneNode(true));
  const b = document.getElementById("purge-btn");

  b.setAttribute("tabindex", "-1");
  b.addEventListener("keydown", (e) => {
    e.preventDefault();
  });

  let dodges = 0;
  const counter = document.createElement("p")
  counter.textContent = "Dodges: 0";
  zone.prepend(counter);

  zone.style.position = "relative";
  b.style.position = "absolute";

  let oldX = b.offsetLeft;
  let oldY = b.offsetTop;

  b.addEventListener("mouseenter", function () {

    const maxX = zone.clientWidth - b.offsetWidth;
    const maxY = zone.clientHeight - b.offsetHeight;

    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;

    while (Math.abs(newX-oldX) < b.offsetWidth && Math.abs(newY - oldY) < b.offsetHeight)
    {
      newX = Math.random() * maxX;
      newY = Math.random() * maxY
    }
    b.style.left = newX + "px";
    b.style.top = newY + "px";

    oldX = newX;
    oldY = newY;

    dodges++;
    counter.textContent = "Dodges: " + dodges;

    b.style.backgroundColor = "green"
  });

  console.log("[attack] runaway button installed");
})();
