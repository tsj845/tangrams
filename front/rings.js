let fed = new MouseEvent("mousedown");
let feu = new MouseEvent("mouseup");
let suppress = -2;
/**@type {HTMLDivElement} */
let drag_highlight = null;

document.addEventListener("mousedown", (ev) => {
    if (suppress == -2) {
        return;
    }
    suppress ++;
    let e = document.createElement("div");
    e.style.setProperty("--x", ev.clientX + "px");
    e.style.setProperty("--y", ev.clientY + "px");
    e.style.setProperty("--c", `#${Math.floor(Math.random()*10)}0${Math.floor(Math.random()*10)}0${Math.floor(Math.random()*10)}0`);
    document.body.appendChild(e);
    e.classList.add("sploder");
    drag_highlight = e;
});

document.addEventListener("mousemove", (ev) => {
    fed = new MouseEvent("mousedown", {clientX:ev.clientX, clientY:ev.clientY});
    feu = new MouseEvent("mouseup", {clientX:ev.clientX, clientY:ev.clientY});
    if (drag_highlight === null) {
        return;
    }
    drag_highlight.style.setProperty("--x", ev.clientX + "px");
    drag_highlight.style.setProperty("--y", ev.clientY + "px");
});

document.addEventListener("mouseup", (ev) => {
    if (drag_highlight === null) {
        return;
    }
    suppress --;
    drag_highlight.classList.add("running");
    drag_highlight.onanimationend = drag_highlight.remove;
    drag_highlight = null;
});

// setInterval(() => {
//     if (suppress === 0) {
//         document.dispatchEvent(fed);
//         document.dispatchEvent(feu);
//     }
// }, 200);

document.addEventListener("keyup", (ev) => {
    if (ev.code === "KeyS") {
        if (suppress >= 0) {
            suppress -= 2;
        } else {
            suppress += 2;
        }
    }
});