//Settings and variable/const defintions
var mSettings = {
    "default": {
        "fullStarImg": 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="gold" class="bi bi-star-fill" viewBox="0 0 16 16">%0A  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>%0A</svg>',
        "emptyStarImg": 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(248,249,250)" class="bi bi-star-fill" viewBox="0 0 16 16">%0A  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>%0A</svg>',
        "hoverStarImg": 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="gold" class="bi bi-star-fill" viewBox="0 0 16 16">%0A  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>%0A</svg>',
        "sNo": 5,//Number > 0
        "sSize": "2.5",//Number > 0
        "tSize": '',//"15px"
        "tColor": "#555",
        "sAlign": "center",
        "tTop": "Liked it? Rate it:",
        "tBottom": "$average$ average based on $votes$ votes.", //$max$
        "tThanks": "Thanks for voting!",
        "tDone": "You rated us $userRating$ star!",
        "tPosition": "bottom",
        "rOff": true
    },
    "indexPage": {},
    "postPage": { "rOff": false },
    "staticPage": { "rOff": false }
}
//Assign settings by type of current page (for Blogger)
let settings = /.*\/\d{4}\/\d{2}\/.*\.html/.test(location.href.split("?")[0].split("#")[0]) ? mSettings.postPage : /.*\/p\/.*\.html/.test(location.href.split("?")[0].split("#")[0]) ? mSettings.staticPage : mSettings.indexPage, dSettings = mSettings.default;
for (let i in dSettings) (typeof (settings[i]) == "undefined") && (settings[i] = dSettings[i]);

//Format path for DB
function pathFormat(mSite) {
    let e = mSite.split("?")[0].split("#")[0].replace("https:", "").replace("http:", "").replace("file:", "").replace("ftp:", "").replace("mailto:", "");
    for (; "/" == e[0];)e = e.substring(1);
    for (0 === e.indexOf("www.") && (e = e.replace("www.", "")); "/" == e[e.length - 1];)e = e.substring(0, e.length - 1);
    //      console.log({e});
    return e = e.replace(/\./g, "_").replace(/\//g, "__").replace(/\,/g, "___").replace(/\s/g, "");
}

//add JSON for SEO


mSInstance = typeof mSInstance == "undefined" ? 0 : mSInstance + 1,
    function (sI) {
        //first instance - create scripts and animation
        if (sI === 0 && !document.getElementById("fbdb")) {
            const fApp = document.createElement("script"); fApp.src = "https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js", fApp.id = ("fbdb"), document["head"].appendChild(fApp), fApp.onload = function () {
                const fDB = document.createElement("script"); fDB.src = "https://www.gstatic.com/firebasejs/8.1.1/firebase-database.js", document.head.appendChild(fDB);
            };
            const sAnimate = document.createElement("style"); sAnimate.innerHTML = "@keyframes mAnimate {0% {transform: rotate(0deg);} 100% {transform:rotate(360deg);}} .mSpinny ~ div{visibility:hidden;}", document.head.appendChild(sAnimate);
        }
        function sRender(e, rating) {
            //star renderer
            const sTag = e.getElementsByTagName("mStar");
            for (let i = 0; i < sTag["length"]; i++) {
                const e = sTag[i].querySelector("empty"), f = sTag[i].querySelector("full"), h = sTag[i].querySelector("hover");
                if (i <= rating) {
                    f.style.width = "100%", e.style.width = "0%";
                    (i >= Math["floor"](rating)) && (rating > 0) && (f.style.opacity = rating % 1);
                } else {
                    f.style.width = "0%", e.style.width = "100%";
                    //                    e.querySelector("img").style.margin = "0 0 0 0";
                }
                h.style.width = "0%";
            }
        }
    //onclick tooltip renderer
    function tTip(text, e, rating) {
            const t = document.createElement("div"); t.innerHTML = text["replace"](/\$userRating\$/g, rating), t.style = "border-radius:7px;position:absolute;background:rgba(255,215,0,25%);padding:5px;text-align:center;opacity:0;transition:opacity 1s;width:200px;boxSizing:border-box;zIndex:9999999", t.style.fontSize = settings["tSize"]; document.body.appendChild(t);
            let loc = e.getBoundingClientRect();
            //            console.log({eCoordinates});
            setTimeout(function () {
                t.style.opacity = "1";
                if (e.style.textAlign === "right") t.style.left = window.scrollX + loc.left + e.offsetWidth - 200 + "px";
                else e.style.textAlign === "center" ? t.style.left = window.scrollX + loc.left + e.offsetWidth / 2 - 100 + "px" : t.style.left = window.scrollX + loc.left + "px";
                t.style.top = (loc.top > t.offsetHeight ? window.scrollY + loc.top - t.offsetHeight : window.scrollY + loc.top + t.offsetHeight) + "px";
            }, 10),
                setTimeout(function () {
                    t.style.opacity = "0",
                        setTimeout(function () { document.body.removeChild(t); }, 1e3);
                }, 3500);
        }
        function main(z) {
            //        console.log({ instance });
            let m = document.getElementsByClassName("mStars")[z],
                mSite = location["host"].replace("www.", "").replace(/\./g, "_")["replace"](/\//g, "__"),
                sName = pathFormat(location.href);
            (mSite === "")&&(mSite = "other");
            if (!sName || sName === "auto") {
                let p = location.href["split"]("?")[0].split("#")[0].replace(location.protocol + "//", "")["replace"]("www.", "");
                (p["substring"](p["length"] - 1) === "/" || p["substring"](p["length"] - 1) === ".") && (p = p.substring(0, p["length"] - 1)),
                    p = p["replace"](/\./g, "_")["replace"](/\//g, "__")["replace"](/\,/g, "___")["replace"](/\s/g, ""),
                    sName = p;
            }
            sName = sName["replace"](/\s/g, "_").replace(/\#/g, "-").replace(/\./g, "-").replace(/\@/g, "-")["replace"](/\!/g, "-")["replace"](/\$/g, "-")["replace"](/\%/g, "-").replace(/\&/g, "-")["replace"](/\(/g, "-").replace(/\)/g, "-");
            m.style.textAlign = settings["sAlign"], m.style.position = "relative";

            //Add Loading Spinner
            let spinny = document.createElement("div"); spinny.classList.add("mSpinny"), spinny.style = "border:3px solid #f3f3f3;border-top:5px solid #002233;border-radius:0.5;width:30px;height:30px;animation:mAnimate 1s linear infinite;border-radius:15px;";
            if (settings["sAlign"] === "center") spinny.style.margin = "auto"; else settings["sAlign"] === "right" && (spinny.style.marginLeft = "calc(100% - " + settings["sSize"] * settings["sNo"] + "rem)");
            m.appendChild(spinny);

            //Text above and below the stars
            let tTop = document.createElement("div"), tBottom = document.createElement("div");
            settings["tBottom"] = settings["tBottom"]["replace"](/\$average\$/g, "<span class='mStars-average'>0</span>")["replace"](/\$votes\$/g, '<span class="mStars-votes">0</span>')["replace"](/\$max\$/g, settings["sNo"]),
                tTop.innerHTML = settings["tTop"], tTop.style.fontSize = settings["tSize"], tTop.style.lineHeight = 2, tTop.style.textAlign = settings["sAlign"], tTop.style.color = settings["tColor"], m.appendChild(tTop), tBottom.style.fontSize = settings["tSize"], tBottom.style.lineHeight = 2, tBottom.style.textAlign = settings["sAlign"], tBottom.style.color = settings["tColor"], tBottom.innerHTML = settings["tBottom"];

            //db
            let dbLoc = document.getElementById("mStarsRating").getAttribute("data-dbURL");
            switch (dbLoc) {
                case null: case "": dbLoc = "Error! Missing Firebase DB URL >> 'https://YOUR-FIREBASE.firebaseio.com'."; break;
                default:
                    if ((dbLoc.indexOf("https://") !== 0) || (dbLoc["lastIndexOf"]("firebaseio.com") < 5)) dbLoc = "Error! Invalid Firebase URL.";
                    else {
                        dbLoc["lastIndexOf"]("/") !== dbLoc.length - 1 && (dbLoc = dbLoc + "/");
                    }
            }
            let sWrap = document.createElement("div"); sWrap.style.width = (settings["sSize"] + 0.1*2) * settings["sNo"] + "rem", sWrap.style["display"] = "inline-block", m.appendChild(sWrap);
            //Star Render
            for (let i = 1; i <= settings["sNo"]; i++) {
                let s = document.createElement("mStar"); s.style = "display:inline-block;margin:0.1rem", s.style.width = settings["sSize"] + "rem", s.style.cursor = !localStorage["mSR_" + sName] && !settings["rOff"] ? "pointer" : "default";
                !settings["rOff"] && (s.onmouseenter = function () {
                    //console.log(localStorage["mSR_" + sRN]);
                    if (!localStorage["mSR_" + sName]) {
                        let st = m.getElementsByTagName("mStar");
                        for (let j = 0; j < st["length"]; j++) {
                            let f = st[j].querySelector("full"),e = st[j].querySelector("empty"),h = st[j].querySelector("hover");
                            j < i ? (f.style.width = "0%",e.style.width = "0%",h.style.width = "100%") : (f.style.width = "0%", h.style.width = "0%", e.style.width = "100%", e.querySelector("img").style.margin = "0 0 0 0");
                        }
                        (settings["tTop"] != "") && (tTop.innerHTML = i + "/" + settings["sNo"]);
                    } else m.title = settings["tDone"]["replace"](/\$userRating\$/g, localStorage["mSR_" + sName]), m.style.cursor = "default";
                    //console.log(localStorage["mSR_" + sRN]);
                });
//                s.setAttribute("value", i);
                let sFull = document.createElement("full"); sFull.style="display:inline-block;overflow:hidden";
                let sEmpty = document.createElement("empty"); sEmpty.style="display:inline-block;overflow:hidden";
                let sHover = document.createElement("hover"); sHover.style="display:inline-block;overflow:hidden";
                let sEImg = document.createElement("img"); sEImg.src = settings["emptyStarImg"], sEImg.style= "background:transparent;border:0;padding:0;margin:0;maxWidth:none";
                let sFImg = document.createElement("img"); sFImg.src = settings["fullStarImg"], sFImg.style= "background:transparent;border:0;padding:0;margin:0;maxWidth:none";
                let sHImg = document.createElement("img"); sHImg.src = settings["hoverStarImg"], sHImg.style = "background:transparent;border:0;padding:0;margin:0;maxWidth:none";
                sEImg.style.width = settings["sSize"] + "rem", sFImg.style.width = settings["sSize"] + "rem", sHImg.style.width = settings["sSize"] + "rem", s.style.lineHeight = "0", sFull.appendChild(sFImg), sEmpty.appendChild(sEImg), sHover.appendChild(sHImg), s.appendChild(sFull), s.appendChild(sEmpty), s.appendChild(sHover), sWrap.appendChild(s);
            }
            m.appendChild(tBottom), sRender(m, 0, settings["sSize"]);
            if (dbLoc.indexOf("Error!") < 0) {
                const dbInitOptions = {};
                dbInitOptions.databaseURL = dbLoc;
                let dbInitApp = firebase.initializeApp(dbInitOptions, sName + sI),
                    dbInit = dbInitApp.database().ref("mStars/" + mSite + "/" + sName);
                dbInit.on("value", dbVal => {
                    let rArr = dbVal.val();
                    if (!rArr) { rArr = { "r": 0, "c": 0 }; }

                    //JSON for SEO - Ratings on Google Search Ranking
                    let rJ = document.createElement("script"); rJ.type = "application/ld+json"; rJ.innerHTML = '{"@context": "https://schema.org/","@type": "CreativeWorkSeries","name": "' + document.title + '","aggregateRating": {"@type": "AggregateRating","ratingValue": "' + (rArr.r * 5) + '","bestRating": "5","ratingCount": "' + rArr.c + '"}}'; document.getElementById("Blog1").append(rJ);
                    
                    //Render stars and remove Spinny
                    sRender(m, rArr.r * settings["sNo"], settings["sSize"]);
                    m.contains(spinny) && spinny.remove();
                    
                    sWrap.onmouseleave = function () { sRender(m, rArr.r * settings["sNo"], settings["sSize"]), tTop.innerHTML = settings["tTop"]; },
                        m.querySelectorAll(".mStars-average").forEach(e => e.textContent = Math["round"](rArr.r * settings["sNo"] * 100) / 100),
                        m.querySelectorAll(".mStars-votes").forEach(e => e.textContent = rArr.c),
                        !settings["rOff"] && m.querySelectorAll("mStar").forEach((e, i) => {
                            e.onclick = function () {
                                if (!localStorage["mSR_" + sName]) {
                                    var newRating = (rArr.r * rArr.c + (i + 1) / settings["sNo"]) / (rArr.c + 1);
                                    const rArrUpdate = {};
                                    rArrUpdate.r = newRating,
                                        rArrUpdate.c = rArr.c + 1,
                                        dbInit.set(rArrUpdate),
                                        localStorage["mSR_" + sName] = i + 1,
                                        m.querySelectorAll("mStar").forEach(e => e.style.cursor = "default"),
                                        tTip(settings["tThanks"], m, i + 1),
                                        tTop.innerHTML = settings["tTop"];
                                } else tTip(settings["tDone"], m, localStorage["mSR_" + sName]);
                                //console.log(localStorage["mSR_" + sName]);
                            };
                        });
                });
            } else m.innerHTML = dbLoc;
    }
    
    //Check if DB is ready
        function sInit(i) {
            typeof firebase == "object" && typeof firebase.database == "function" && typeof firebase.initializeApp == "function" ? main(i) : setTimeout(function () { sInit(i); }, 50);
        }
        sInit(sI);
    }(mSInstance);