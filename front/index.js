/**@type {HTMLDivElement} */
const tgrp = document.getElementById("tangram-grp");

/**@type {Array<{kind:string,color:string,pos:[number,number],rot:number}>} */
const tangramconf = [
    {kind:"bigtri",color:"maroon",pos:[0,1],rot:-135},
    {kind:"bigtri",color:"blue",pos:[1,0],rot:-45},
    {kind:"smoltri",color:"red",pos:[2,0.5],rot:45},
    {kind:"smoltri",color:"gray",pos:[1,1.5],rot:135},
    {kind:"medtri",color:"green",pos:[1.5,1.5],rot:-90},
    {kind:"square",color:"orange",pos:[1.5,1],rot:45},
    {kind:"para",color:"purple",pos:[0.75,1.75],rot:0}
];
const posmul = Math.sin(45);

function init() {
    while (tgrp.firstChild !== null) {
        tgrp.firstChild.remove();
    }
    tgrp.style.setProperty("--jsm-hypot-full-width", Math.sqrt(50 * 100) + "vmin");
    const striw = 25 / Math.sqrt(2);
    tgrp.style.setProperty("--jsm-stri-width", striw + "vmin");
    tgrp.style.setProperty("--jsm-para-h", Math.sqrt(striw ** 2 - 12.5 ** 2) + "vmin");
    tgrp.style.setProperty("--jsm-para-path", `polygon(0% 100%, ${100/3}% 0%, 100% 0%, ${200/3}% 100%)`);
    for (let i = 0; i < tangramconf.length; i ++) {
        const tcon = tangramconf[i];
        let tgram = document.createElement("div");
        tgram.classList.add("tangram", tcon.kind);
        tgram.style.setProperty("--color", tcon.color);
        tgram.style.setProperty("--px", tcon.pos[0]);
        tgram.style.setProperty("--py", tcon.pos[1]);
        tgram.style.setProperty("--rot", tcon.rot + "deg");
        tgrp.appendChild(tgram);
    }
}

init();

let fed = new MouseEvent("mousedown");
let feu = new MouseEvent("mouseup");
let suppress = 0;
/**@type {HTMLDivElement} */
let drag_highlight = null;

document.addEventListener("mousedown", (ev) => {
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

setInterval(() => {
    if (suppress === 0) {
        document.dispatchEvent(fed);
        document.dispatchEvent(feu);
    }
}, 200);

document.addEventListener("keyup", (ev) => {
    if (ev.code === "KeyS") {
        if (suppress >= 0) {
            suppress -= 2;
        } else {
            suppress += 2;
        }
    }
});