# Mission 2: Console attack, sabotage the purge button

## Evidence

The button dodges (two positions), with my attacker counter visible:

![position 1](img/m2-pos1.png)
![position 2](img/m2-pos2.png)

A legitimate click does nothing after my attack (log still reads "No purge requested"):

![click does nothing](img/m2-click.png)

## My attack script

Paste the full contents of `attacks/m2_runaway.js`, with one sentence per block:

```
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
```

- **How do you remove the portal's original click handler without reloading?**

  I used cloneNode(true) and replaceWith()

- **How do you stop a keyboard user from triggering the button?**

  The button's tabindex was set to -1.

- **How do you keep the button fully inside `#danger-zone` and off its previous position?**

  To calculate maximum X and Y, I used the danger zone and button size. A random position was made using a while loop if it went to the previous position.

## Creativity: my twist, R5

I changed the button's background color to green after dodging to show the style change. 

## Think like a defender

The mouse trick is theater. The real problem is that attacker code ran in the operator's page at all. If "Purge All Incidents" were a real, destructive action:

1. Where must the actual protection live?

   It should live on the server since JavaScript and DOM elements can be modified by an attacker.

2. What should the server check on every purge request? Name at least two things.

   The server should check if the user is authenticated and if the user has permission to purge. 

3. Which Unit 1.3 slide or takeaway does this map to?

   Slides 18-22 in 1.3 slide about Event Listeners

## Documentation log

| Page I used, with URL | One thing I learned from it |
|Class 1.3 slides|Event listeners can be removed by replacing an element with a clone|
| | |
