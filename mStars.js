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
    },
    "archive": {},
    "error_page": {},
    "index": {},
    "item": {},
    "static_page": {}
}

//first instance - create scripts and animation
if (!document.getElementById("fbdb")) {
    const fApp = document.createElement("script"); fApp.src = "https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js", fApp.id = ("fbdb"), document["head"].appendChild(fApp), fApp.onload = function () {
        const fDB = document.createElement("script"); fDB.src = "https://www.gstatic.com/firebasejs/8.1.1/firebase-database.js", document.head.appendChild(fDB);
    };
    const sAnimate = document.createElement("style"); sAnimate.innerHTML = "@keyframes mAnimate {0% {transform: rotate(0deg);} 100% {transform:rotate(360deg);}} .mSpinny ~ div{visibility:hidden;}", document.head.appendChild(sAnimate);
}

//Check if DB is ready
function init() {
    //    console.log({ i },document.getElementsByClassName("mStars"));
    if (typeof firebase == "object" && typeof firebase.database == "function" && typeof firebase.initializeApp == "function") {
        let db = document.getElementById("mStars").getAttribute("data-db"),
            a = firebase.initializeApp({ "databaseURL": db }, "mStars");
        Array.from(document.getElementsByClassName("mStars")).forEach((e) => { mStars(e, db, a) });
    } else { setTimeout(function () { init(); }, 50); }
}

//Covert path into identifier
function pathFormat(p, host) {
    let e = p.split("?")[0].split("#")[0].replace("https:", "").replace("http:", "").replace("file:", "").replace("ftp:", "").replace("mailto:", "");
    for (; "/" == e[0];)e = e.substring(1);
    for (0 === e.indexOf("www.") && (e = e.replace("www.", "")); "/" == e[e.length - 1];)e = e.substring(0, e.length - 1);
    //      console.log({e});
    e = e.replace(/\./g, "_").replace(/\//g, "__").replace(/\,/g, "___").replace(/\s/g, "");
    return e = e.replace(host, "");
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
function tTip(t, e, r, f) {
    const T = document.createElement("div"); T.innerHTML = t.replace(/\$userRating\$/g, r), T.style = "border-radius:7px;position:absolute;background:rgba(255,215,0,25%);padding:5px;text-align:center;opacity:0;transition:opacity 1s;width:200px;boxSizing:border-box;zIndex:9999999", T.style.fontSize = f; document.body.appendChild(T);
    let b = e.getBoundingClientRect();
    //            console.log({eCoordinates});
    setTimeout(function () {
        T.style.opacity = "1";
        if (e.style.textAlign === "right") T.style.left = window.scrollX + b.left + e.offsetWidth - 200 + "px";
        else e.style.textAlign === "center" ? T.style.left = window.scrollX + b.left + e.offsetWidth / 2 - 100 + "px" : T.style.left = window.scrollX + b.left + "px";
        T.style.top = (b.top > T.offsetHeight ? window.scrollY + b.top - T.offsetHeight : window.scrollY + b.top + T.offsetHeight) + "px";
    }, 10),
        setTimeout(function () {
            T.style.opacity = "0",
                setTimeout(function () { document.body.removeChild(T); }, 1e3);
        }, 3500);
}

function mStars(m, db, app) {
    //        console.log({ m, i});
    const H = location.host.replace("www.", "").replace(/\./g, "_").replace(/\//g, "__"),
        pType = m.dataset.pagetype,
        isM = !(m.dataset.display == "true"),
        sSet = mSettings[pType],
        dSet = mSettings.default;
    let sPath = pathFormat(m.getAttribute("data-url"), H),
        R = localStorage["mSR_" + sPath];
    for (let i in dSet) (typeof (sSet[i]) == "undefined") && (sSet[i] = dSet[i]); //Assign settings by type of current page (for Blogger)
   // console.log({sSet,dSet,m,pType,sType: isM}, m.dataset.display, location.href, location.host);
    sSet["sSize"]= isM ? dSet["sSize"]:(dSet["sSize"] / 3);
    m.style.textAlign = sSet["sAlign"], m.style.position = "relative";
    sPath = sPath.replace(/\s/g, "_").replace(/\#/g, "-").replace(/\./g, "-").replace(/\@/g, "-").replace(/\!/g, "-").replace(/\$/g, "-").replace(/\%/g, "-").replace(/\&/g, "-").replace(/\(/g, "-").replace(/\)/g, "-");
    //console.log(sSet["sSize"],isM);

    //Add Loading Spinner
    let spinny = document.createElement("div"); spinny.classList.add("mSpinny"), spinny.style = "border:3px solid #f3f3f3;border-top:5px solid #002233;border-radius:0.5;width:30px;height:30px;animation:mAnimate 1s linear infinite;border-radius:15px;";
    if (sSet["sAlign"] === "center") spinny.style.margin = "auto"; else sSet["sAlign"] === "right" && (spinny.style.marginLeft = "calc(100% - " + sSet["sSize"] * sSet["sNo"] + "rem)");
    m.appendChild(spinny);

    if (isM) {
        //Text above and below the stars
        var tTop = document.createElement("div"), tBottom = document.createElement("div");
        sSet["tBottom"] = sSet["tBottom"].replace(/\$average\$/g, "<span class='mStars-average'>0</span>").replace(/\$votes\$/g, '<span class="mStars-votes">0</span>').replace(/\$max\$/g, sSet["sNo"]),
            tTop.innerHTML = !R ? sSet["tTop"] : sSet["tDone"].replace(/\$userRating\$/g, R);
        tBottom.innerHTML = sSet["tBottom"],
            tTop.style.fontSize = tBottom.style.fontSize = sSet["tSize"],
            tTop.style.lineHeight = tBottom.style.lineHeight = 2,
            tTop.style.textAlign = tBottom.style.textAlign = sSet["sAlign"],
            tTop.style.color = tBottom.style.color = sSet["tColor"],
            m.appendChild(tTop); m.appendChild(tBottom);
    }
    //db
    switch (db) {
        case null: case "": db = "Error! Missing Firebase DB URL >> 'https://YOUR-FIREBASE.firebaseio.com'."; break;
        default:
            if ((db.indexOf("https://") !== 0) || (db.lastIndexOf("firebaseio.com") < 5)) db = "Error! Invalid Firebase URL.";
            else { db.lastIndexOf("/") !== db.length - 1 && (db = db + "/"); }
    }
    let sWrap = document.createElement("div"); sWrap.style.width = (sSet["sSize"] + 0.1 * 2) * sSet["sNo"] + "rem", sWrap.style = "display:inline-block;margin:1rem", m.insertBefore(sWrap, m.lastChild);
    //Star Render
    for (let i = 1; i <= sSet["sNo"]; i++) {
        let s = document.createElement("mStar"); s.style = "display:inline-block;margin:0.1rem", s.style.width = sSet["sSize"] + "rem", s.style.cursor = !R && isM ? "pointer" : "default";
        isM && (s.onmouseenter = function () {
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
    //            sRender(m, 0);
    if (db.indexOf("Error!") < 0) {
        let dbInit = app.database().ref("mStars/" + H + "/" + sPath);
        //console.log({ dbInit },app.name,sPath);
        dbInit.on("value", dbVal => {
            let rArr = dbVal.val() || { "r": 0, "c": 0 },
                rating = (rArr.r * sSet["sNo"]).toFixed(4);
            //                    console.log({ rArr });

            //Render stars and remove Spinny
            sRender(m, rating);
            m.contains(spinny) && spinny.remove();

            //JSON for SEO - Ratings on Google Search Ranking
            document.getElementById("ratingJSON").innerHTML = '{"@context": "https://schema.org/","@type": "CreativeWorkSeries","name": "' + document.title + '","aggregateRating": {"@type": "AggregateRating","ratingValue": "' + rating + '","bestRating": "5","ratingCount": "' + rArr.c + '"}}';

            if (isM) {
                sWrap.onmouseleave = function () { sRender(m, rating), tTop.innerHTML = !R ? sSet["tTop"] : sSet["tDone"].replace(/\$userRating\$/g, R); },
                    m.querySelectorAll(".mStars-average").forEach(e => e.textContent = Math.round(rating * 100) / 100),
                    m.querySelectorAll(".mStars-votes").forEach(e => e.textContent = rArr.c),
                    m.querySelectorAll("mStar").forEach((e, i) => {
                        e.onclick = function () {
                            if (!R) {
                                // console.log({ R }, !R);
                                //rating update
                                var newRating = (rArr.r * rArr.c + (i + 1) / sSet["sNo"]) / (rArr.c + 1);
                                dbInit.set({ "r": newRating, "c": rArr.c + 1 }),
                                    R = localStorage["mSR_" + sPath] = i + 1,
                                    m.querySelectorAll("mStar").forEach(e => e.style.cursor = "default"),
                                    tTip(sSet["tThanks"], m, i + 1, sSet["tSize"]),
                                    tTop.innerHTML = sSet["tTop"];
                            } else tTip(sSet["tDone"], m, R, sSet["tSize"]);
                            //console.log(R);
                        };
                    });
            }
        });
    } else m.innerHTML = db;
}
init();