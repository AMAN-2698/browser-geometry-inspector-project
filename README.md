# DOM Geometry & Coordinate Inspector

* **[Click here to view the Live Interactive Demo!](https://aman-2698.github.io/browser-geometry-inspector-project/)**

hey everyone! i built this interactive developer tool to visualize and test how browser geometry, the css box model, and DOM coordinates actually work in real-time.

## what it does
figuring out how the browser's c++ rendering engine calculates layout space can be super confusing. i built this real-time dashboard to track exactly what happens when you interact with the page. it tracks:
* **mouse events:** `clientX/Y`, `pageX/Y`, `offsetX/Y`, and `screenX/Y`.
* **the css box model:** `clientWidth` (inner space), `offsetWidth` (physical box), and `scrollWidth` (hidden overflow).
* **viewport vs document:** `offsetLeft/Top` vs `getBoundingClientRect()`.

## cool features
* **live tracking:** the math updates instantly as you scroll or move the mouse around the arena.
* **collision math:** shows the exact coordinates needed to build custom ui components (like right-click menus) so they don't clip off the screen.
* **fractional pixels & scrollbars:** accurately calculates edge cases like windows display scaling and native scrollbar widths.

## how i optimized it
i built this with raw html, css, and vanilla js, and focused heavily on performance:
* **`DocumentFragment` rendering:** the background has a 2,500-cell grid. instead of appending divs one by one and freezing the dom, i generated it all in js and injected it using a single `DocumentFragment`. it drops layout recalculations to almost nothing.
* **dom query caching:** the `mousemove` event fires constantly. to stop the browser from lagging, i queried all the target elements once on load and stored them in a cached js object. inside the event, i strictly update `.textContent`.
* **semantic html:** clean, w3c-compliant html structure to prevent layout bugs with inline vs block elements.

## how to run it
You can directly visit an live demo link given at the top of this README file or
1. clone the repo.
2. open `index.html` in your browser.
3. move your mouse, scroll around, and hover over the target box to see the engine do the math!

## compatibility
This tool is designed for precision tracking and keyboard/mouse interaction. for the best experience, **please use it on a desktop or laptop.** while it is responsive, it is not optimized for mobile touchscreens because mobile browsers do not fire the mouse-based events required for accurate geometry calculation.
