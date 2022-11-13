//Settings and variable/const defintions
var mSettings = {
    "default": {
        "sNo": 5,//Number > 0
        "sSize": 2.5,//in rem, Number > 0
        "tSize": '',//any unit
        "tColor": '',
        "sAlign": "center",
        "tTop": "Liked it? Rate it:",
        "tBottom": "$average$ average based on $votes$ votes.", //$max$
        "tThanks": "Thanks for voting!",
        "tDone": "You rated this $userRating$ star!",
        "tPosition": "bottom",
        "rOff": true
    },
    "indexPage": {},
    "postPage": { "rOff": false },
    "staticPage": { "rOff": false }
}

//Assign settings by type of current page (for Blogger)
sSet = typeof sSet == "undefined";
if (sSet) {
    sSet = /.*\/\d{4}\/\d{2}\/.*\.html/.test(location.href.split("?")[0].split("#")[0]) ? mSettings.postPage : /.*\/p\/.*\.html/.test(location.href.split("?")[0].split("#")[0]) ? mSettings.staticPage : mSettings.indexPage, defSet = mSettings.default;
    for (let i in defSet) (typeof (sSet[i]) == "undefined") && (sSet[i] = defSet[i]);
}

mSInstance = typeof mSInstance == "undefined" ? 0 : mSInstance + 1,
    function (sI) {
        //first instance - create scripts and animation
        if (sI === 0 && !document.getElementById("fbdb")) {
            const fApp = document.createElement("script"); fApp.src = "https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js", fApp.id = ("fbdb"), document["head"].appendChild(fApp), fApp.onload = function () {
                const fDB = document.createElement("script"); fDB.src = "https://www.gstatic.com/firebasejs/8.1.1/firebase-database.js", document.head.appendChild(fDB);
            };
            const sAnimate = document.createElement("style"); sAnimate.innerHTML = "@keyframes mAnimate {0% {transform: rotate(0deg);} 100% {transform:rotate(360deg);}} .mSpinny ~ div{visibility:hidden;}", document.head.appendChild(sAnimate);
    }
    
//Covert path into identifier
function pathFormat(p) {
    let e = p.split("?")[0].split("#")[0].replace("https:", "").replace("http:", "").replace("file:", "").replace("ftp:", "").replace("mailto:", "");
    for (; "/" == e[0];)e = e.substring(1);
    for (0 === e.indexOf("www.") && (e = e.replace("www.", "")); "/" == e[e.length - 1];)e = e.substring(0, e.length - 1);
    //      console.log({e});
    return e = e.replace(/\./g, "_").replace(/\//g, "__").replace(/\,/g, "___").replace(/\s/g, "");
}
        //Star Renderer
        function sRender(e, rating) {
            //        console.log({ e, rating });
            const sTag = e.getElementsByTagName("mStar");
            for (let i = 0; i < sTag.length; i++) {
                const e = sTag[i].querySelector("empty"), f = sTag[i].querySelector("full"), h = sTag[i].querySelector("hover");
                f.style.width = "0%", e.style.width = "100%", h.style.width = "0%", e.style.opacity = .1;
                if (i < rating && rating > 0) {
                    f.style.width = "100%", e.style.width = "0%";
                    (i >= Math.floor(rating)) && (rating > 0) && (f.style.opacity = rating % 1);
                } else { e.style.opacity = rating % 1 > 0 ? rating % 1 : .1; }
                //                console.log({ i },e.style.opacity,e.style.width);
            }
        }
        //onclick tooltip renderer
        function tTip(text, e, rating) {
            const t = document.createElement("div"); t.innerHTML = text.replace(/\$userRating\$/g, rating), t.style = "border-radius:7px;position:absolute;background:rgba(255,215,0,25%);padding:5px;text-align:center;opacity:0;transition:opacity 1s;width:200px;boxSizing:border-box;zIndex:9999999", t.style.fontSize = sSet["tSize"]; document.body.appendChild(t);
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
            console.log({ z });
            let m = document.getElementsByClassName("mStars")[z],
                mSite = location.host.replace("www.", "").replace(/\./g, "_").replace(/\//g, "__"),
                dbLoc = m.getAttribute("data-dbURL"),
                sPath = pathFormat(m.getAttribute("data-url")),
                R = localStorage["mSR_" + sPath];
            //            console.log({mSite,R,dbLoc,sName},location.href,location.host,sName===location.href);
            (mSite === "") && (mSite = "other");
            if (!sPath || sPath === "auto") {
                let p = location.href["split"]("?")[0].split("#")[0].replace(location.protocol + "//", "").replace("www.", "");
                (p.substring(p.length - 1) === "/" || p.substring(p.length - 1) === ".") && (p = p.substring(0, p.length - 1)),
                    p = p.replace(/\./g, "_").replace(/\//g, "__").replace(/\,/g, "___").replace(/\s/g, ""),
                    sPath = p;
            }
            sPath = sPath.replace(/\s/g, "_").replace(/\#/g, "-").replace(/\./g, "-").replace(/\@/g, "-").replace(/\!/g, "-").replace(/\$/g, "-").replace(/\%/g, "-").replace(/\&/g, "-").replace(/\(/g, "-").replace(/\)/g, "-");
            m.style.textAlign = sSet["sAlign"], m.style.position = "relative";

            //Add Loading Spinner
            let spinny = document.createElement("div"); spinny.classList.add("mSpinny"), spinny.style = "border:3px solid #f3f3f3;border-top:5px solid #002233;border-radius:0.5;width:30px;height:30px;animation:mAnimate 1s linear infinite;border-radius:15px;";
            if (sSet["sAlign"] === "center") spinny.style.margin = "auto"; else sSet["sAlign"] === "right" && (spinny.style.marginLeft = "calc(100% - " + sSet["sSize"] * sSet["sNo"] + "rem)");
            m.appendChild(spinny);

            //Text above and below the stars
            let tTop = document.createElement("div"), tBottom = document.createElement("div");
            sSet["tBottom"] = sSet["tBottom"].replace(/\$average\$/g, "<span class='mStars-average'>0</span>").replace(/\$votes\$/g, '<span class="mStars-votes">0</span>').replace(/\$max\$/g, sSet["sNo"]),
                tTop.innerHTML = !R ? sSet["tTop"] : sSet["tDone"].replace(/\$userRating\$/g, R);
            tBottom.innerHTML = sSet["tBottom"],
                tTop.style.fontSize = tBottom.style.fontSize = sSet["tSize"],
                tTop.style.lineHeight = tBottom.style.lineHeight = 2,
                tTop.style.textAlign = tBottom.style.textAlign = sSet["sAlign"],
                tTop.style.color = tBottom.style.color = sSet["tColor"],
                m.appendChild(tTop);

            //db
            switch (dbLoc) {
                case null: case "": dbLoc = "Error! Missing Firebase DB URL >> 'https://YOUR-FIREBASE.firebaseio.com'."; break;
                default:
                    if ((dbLoc.indexOf("https://") !== 0) || (dbLoc.lastIndexOf("firebaseio.com") < 5)) dbLoc = "Error! Invalid Firebase URL.";
                    else {
                        dbLoc.lastIndexOf("/") !== dbLoc.length - 1 && (dbLoc = dbLoc + "/");
                    }
            }
            let sWrap = document.createElement("div"); sWrap.style.width = (sSet["sSize"] + 0.1 * 2) * sSet["sNo"] + "rem", sWrap.style = "display:inline-block;margin:1rem", m.appendChild(sWrap);
            //Star Render
            for (let i = 1; i <= sSet["sNo"]; i++) {
                let s = document.createElement("mStar"); s.style = "display:inline-block;margin:0.1rem", s.style.width = sSet["sSize"] + "rem", s.style.cursor = !R && !sSet["rOff"] ? "pointer" : "default";
                !sSet["rOff"] && (s.onmouseenter = function () {
                    if (!R) {
                        let s = m.getElementsByTagName("mStar");
                        for (let j = 0; j < s.length; j++) {
                            let f = s[j].querySelector("full"), e = s[j].querySelector("empty"), h = s[j].querySelector("hover");
                            j < i ? (f.style.width = e.style.width = "0%", h.style.width = "100%") : (f.style.width = h.style.width = "0%", e.style.width = "100%", e.style.opacity = .5);
                        }
                        (sSet["tTop"] != "") && (tTop.innerHTML = i + "/" + sSet["sNo"]);
                    } else m.title = sSet["tDone"].replace(/\$userRating\$/g, R), m.style.cursor = "default";
                });
                let F = document.createElement("full");
                let E = document.createElement("empty");
                let H = document.createElement("hover");
                F.style = E.style = H.style = "display:inline-block;overflow:hidden";
                E.innerHTML = F.innerHTML = H.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="' + sSet["sSize"] + 'rem" height="' + sSet["sSize"] + 'rem" fill="gold" class="bi bi-star-fill" viewBox="0 0 16 16">%0A  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>%0A</svg>';
                E.firstChild.style.fill = 'rgb(248,249,250)';
                s.style.lineHeight = "0", s.append(F, E, H), sWrap.appendChild(s);
            }
            m.appendChild(tBottom);
            //            sRender(m, 0);
            if (dbLoc.indexOf("Error!") < 0) {
                let dbInitApp = firebase.initializeApp({ "databaseURL": dbLoc }, sPath + sI),
                    dbInit = dbInitApp.database().ref("mStars/" + mSite + "/" + sPath);
                dbInit.on("value", dbVal => {
                    let rArr = dbVal.val() || { "r": 0, "c": 0 },
                        rating = (rArr.r * sSet["sNo"]).toFixed(4);
                    //                    console.log({ rArr });

                    //Render stars and remove Spinny
                    sRender(m, rating);
                    m.contains(spinny) && spinny.remove();

                    //JSON for SEO - Ratings on Google Search Ranking
                    document.getElementById("ratingJSON").innerHTML = '{"@context": "https://schema.org/","@type": "CreativeWorkSeries","name": "' + document.title + '","aggregateRating": {"@type": "AggregateRating","ratingValue": "' + rating + '","bestRating": "5","ratingCount": "' + rArr.c + '"}}';

                    sWrap.onmouseleave = function () { sRender(m, rating), tTop.innerHTML = !R ? sSet["tTop"] : sSet["tDone"].replace(/\$userRating\$/g, R); },
                        m.querySelectorAll(".mStars-average").forEach(e => e.textContent = Math.round(rating * 100) / 100),
                        m.querySelectorAll(".mStars-votes").forEach(e => e.textContent = rArr.c),
                        !sSet["rOff"] && m.querySelectorAll("mStar").forEach((e, i) => {
                            e.onclick = function () {
                                if (!R) {
                                    // console.log({ R }, !R);
                                    //rating update
                                    var newRating = (rArr.r * rArr.c + (i + 1) / sSet["sNo"]) / (rArr.c + 1);
                                        dbInit.set({"r":newRating,"c":rArr.c + 1}), 
                                        R = localStorage["mSR_" + sPath] = i + 1,
                                        m.querySelectorAll("mStar").forEach(e => e.style.cursor = "default"),
                                        tTip(sSet["tThanks"], m, i + 1),
                                        tTop.innerHTML = sSet["tTop"];
                                } else tTip(sSet["tDone"], m, R);
                                //console.log(R);
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