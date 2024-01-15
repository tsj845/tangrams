/**@type {HTMLDivElement} */
const tgrp = document.getElementById("tangram-grp");

/**@type {Array<{kind:"bigtri"|"medtri"|"smoltri"|"square"|"para",color:string,pos:[number,number],rot:number}>} */
let tangrams = [
    {kind:"bigtri",color:"#7df9ff",pos:[0.95,1.05],rot:0},
    {kind:"bigtri",color:"maroon",pos:[0,1],rot:-135},
    {kind:"bigtri",color:"blue",pos:[1,0],rot:-45},
    {kind:"smoltri",color:"red",pos:[2,0.5],rot:45},
    {kind:"smoltri",color:"gray",pos:[1,1.5],rot:135},
    {kind:"medtri",color:"green",pos:[1.5,1.5],rot:-90},
    {kind:"square",color:"orange",pos:[1.5,1],rot:45},
    {kind:"para",color:"purple",pos:[0.75,1.75],rot:0}
];

let csel = -1;

function init() {
    while (tgrp.firstChild !== null) {
        tgrp.firstChild.remove();
    }
    tgrp.style.setProperty("--jsm-sqrt-two", Math.sqrt(2));
    tgrp.style.setProperty("--jsm-hypot-full-width", Math.sqrt(50 * 100) + "vmin");
    const striw = 25 / Math.sqrt(2);
    tgrp.style.setProperty("--jsm-stri-width", striw + "vmin");
    tgrp.style.setProperty("--jsm-para-h", Math.sqrt(striw ** 2 - 12.5 ** 2) + "vmin");
    tgrp.style.setProperty("--jsm-para-path", `polygon(0% 100%, ${100/3}% 0%, 100% 0%, ${200/3}% 100%)`);
    for (let i = 0; i < tangrams.length; i ++) {
        const tcon = tangrams[i];
        let tgram = document.createElement("div");
        tgram.classList.add("tangram", tcon.kind);
        tgram.style.setProperty("--color", tcon.color);
        /**@type {HTMLDivElement} */
        let arrow = document.createElement("div");
        arrow.classList.add("tangram-arrow");
        /**@type {HTMLDivElement} */
        let head = document.createElement("div");
        head.classList.add("t-arrow-head");
        /**@type {HTMLDivElement} */
        let cont = document.createElement("div");
        cont.style.setProperty("--px", tcon.pos[0]);
        cont.style.setProperty("--py", tcon.pos[1]);
        cont.style.setProperty("--rot", tcon.rot + "deg");
        cont.classList.add("tgram-container");
        cont.appendChild(tgram);
        cont.appendChild(arrow);
        cont.appendChild(head);
        if (i > 0) {cont.style.setProperty("display", "none");}
        tgrp.appendChild(cont);
    }
}

init();