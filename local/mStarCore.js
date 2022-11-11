mStarCreator = typeof mStarCreator == "undefined" ? 0 : mStarCreator + 1,
  function (mStarExists) {
    //  console.log({ v5 });
  if (mStarExists === 0 && !document["querySelector"]("script[src='https://www.gstatic.com/firebasejs/8.1.1/firebase-database.js']")) {
      //create scripts and animation in first instance
      const fApp = document["createElement"]("script"); fApp["src"] = "https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js", document["head"].appendChild(fApp), fApp.onload = function () {
        const fDB = document.createElement("script"); fDB["src"] = "https://www.gstatic.com/firebasejs/8.1.1/firebase-database.js", document.head.appendChild(fDB);
      };
      const sAnimate = document["createElement"]("style"); sAnimate["innerHTML"] = "@keyframes mAnimate {0% {transform: rotate(0deg);} 100% {transform:rotate(360deg);}} .mStars-loader ~ div{visibility:hidden;}", document.head["appendChild"](sAnimate);
    }
    function sRender(d, sRating) {
      //star renderer
      let sTag = d.getElementsByTagName("mStar");
      for (let i = 0; i < sTag["length"]; i++) {
        if (i <= sRating) {
//          console.log(i, sRating, sRating % 1,sTag["length"]);
          sTag[i]["querySelector"]("full")["style"]["width"] = "100%",
            sTag[i].querySelector("empty")["style"].width = "0%";
          (i >= Math["floor"](sRating))&&(sRating>0)&&(d["getElementsByTagName"]("mStar")[i].querySelector("full")["style"]["opacity"] = sRating%1);
        } else i > sRating && (sTag[i]["querySelector"]("full")["style"]["width"] = "0%",
          sTag[i]["querySelector"]("empty")["style"]["width"] = "100%",
          sTag[i]["querySelector"]("empty")["querySelector"]("img")["style"]["margin"] = "0 0 0 0");
        sTag[i].querySelector("hover").style["width"] = "0%";
      }
    }
    function sClickTip(text, element, rating) {
      //onclick tooltip renderer
      let clickTip = document["createElement"]("div");
      clickTip["innerHTML"] = text["replace"](/\$userRating\$/g, rating),
        clickTip["style"] = "border:1px solid gold;borderRadius:7px",
 clickTip["style"]["position"] = "absolute",
        clickTip.style.background = "white",
        clickTip["style"]["color"] = "inherit",
        clickTip["style"]["background-color"] = "rgba(255,215,0,25%)",
        clickTip["style"]["padding"] = "3px 7px",
        clickTip["style"]["lineHeight"] = 1.2,
        clickTip["style"]["textAlign"] = "center",
        clickTip.style["opacity"] = "0",
        clickTip.style["transition"] = "opacity 1s",
        clickTip["style"]["width"] = "200px",
        clickTip["style"]["boxSizing"] = "border-box",
        clickTip["style"]["zIndex"] = 9999999,
        document["body"].appendChild(clickTip);
      let eCoordinates = element["getBoundingClientRect"]();
      setTimeout(function () {
        clickTip.style["opacity"] = "1";
        if (element["style"]["textAlign"] === "right") clickTip["style"]["left"] = window["scrollX"] + eCoordinates["left"] + element["offsetWidth"] - 200 + "px";
        else element["style"]["textAlign"] === "center" ? clickTip.style["left"] = window["scrollX"] + eCoordinates.left + element["offsetWidth"] / 2 - 100 + "px" : clickTip.style.left = window["scrollX"] + eCoordinates["left"] + "px";
        clickTip["style"]["top"] = (eCoordinates.top > clickTip["offsetHeight"] ? window["scrollY"] + eCoordinates["top"] - clickTip["offsetHeight"] : window["scrollY"] + eCoordinates["top"] + clickTip["offsetHeight"]) + "px";
      }, 10),
        setTimeout(function () {
          clickTip.style["opacity"] = "0",
          setTimeout(function () { document["body"]["removeChild"](clickTip); }, 1e3);
        }, 3500);
    }
    function mStarRating(instance) {
      let mStar = document["querySelectorAll"]('script[id="mStars"]')[instance],
        mSite = location["host"].replace("www.", "").replace(/\./g, "_")["replace"](/\//g, "__");
      //console.log({garfield: mSite},location["host"]);
      if (mSite === "") mSite = "other";
      let sRN = mStar["getAttribute"]("ratingName");
      if (!sRN || sRN === "auto") {
        let mPage = location.href["split"]("?")[0].split("#")[0].replace(location.protocol + "//", "")["replace"]("www.", "");
        (mPage["substring"](mPage["length"] - 1) === "/" || mPage["substring"](mPage["length"] - 1) === ".") && (mPage = mPage.substring(0, mPage["length"] - 1)),
          mPage = mPage["replace"](/\./g, "_")["replace"](/\//g, "__")["replace"](/\,/g, "___")["replace"](/\s/g, ""),
          sRN = mPage;
      }
      sRN = sRN["replace"](/\s/g, "_").replace(/\#/g, "-").replace(/\./g, "-").replace(/\@/g, "-")["replace"](/\!/g, "-")["replace"](/\$/g, "-")["replace"](/\%/g, "-").replace(/\&/g, "-")["replace"](/\(/g, "-").replace(/\)/g, "-");
      let sEmptyImg = mStar.getAttribute("emptyStarImg"),
        sFullImg = mStar["getAttribute"]("fullStarImg"),
        sHoverImg = mStar["getAttribute"]("hoverStarImg");
      if (sHoverImg === null || sHoverImg == "") sHoverImg = sFullImg;
      let sSize = mStar["getAttribute"]("starSize");
      if (!sSize || Number(sSize) < 0 || isNaN(sSize)) sSize = 25;
      sSize = Number(sSize);
      let tDone = mStar.getAttribute("blockingText");
      if (tDone === null) tDone = "You have already cast your vote, your rating is $userRating$.";
      let sAlign = mStar["getAttribute"]("align");
      if (sAlign !== "right" && sAlign !== "left") sAlign = "center";
      let tSize = mStar["getAttribute"]("textSize");
      if (!tSize || Number(tSize) < 0 || isNaN(tSize)) tSize = 15;
      tSize = Number(tSize);
      let sTextColor = mStar["getAttribute"]("textColor") || "inherit",
        sFont = "inherit";//mStar.getAttribute("fontFamily")
      let sStatus = (mStar["getAttribute"]("status") === "readonly"),
        tTop = mStar["getAttribute"]("topText") || "Rating:",
        tBottom = mStar["getAttribute"]("bottomText") || "Average: <b>$average$</b> / $max$ (<b>$votes$</b> votes)",
        sNo = Number(mStar.getAttribute("numberOfStars"));
      if (sNo < 1 || isNaN(sNo)) sNo = 5;
      let tThanks = mStar["getAttribute"]("thankYouText") || "Thanks for voting",
        rWrap = document["createElement"]("div");
      rWrap["setAttribute"]("ratingName", sRN), mStar["parentNode"]["insertBefore"](rWrap, mStar), rWrap.style["textAlign"] = sAlign, rWrap["style"]["position"] = "relative";
      //rWrap["oncontextmenu"] = function (geanie) { return geanie["preventDefault"](), false; };
      let sLoader = document["createElement"]("div");
      sLoader["setAttribute"]("class", "mStars-loader"), sLoader["style"]["border"] = "6px solid #f3f3f3", sLoader["style"].borderRadius = "0.5", sLoader["style"]["borderTop"] = "6px solid #3498db", sLoader["style"].width = "25px", sLoader["style"]["height"] = "25px", sLoader.style["animation"] = "mAnimate 1s linear infinite";
      if (sAlign === "center") sLoader["style"]["margin"] = "auto"; else sAlign === "right" && (sLoader.style.marginLeft = "calc(100% - " + sSize * sNo + "px)");
      rWrap["appendChild"](sLoader);
      let dTextTop = document["createElement"]("div"), dTextBottom = document["createElement"]("div");
      tBottom = tBottom["replace"](/\$average\$/g, "<span class='mStars-average'>0</span>")["replace"](/\$votes\$/g, '<span class="mStars-votes">0</span>')["replace"](/\$max\$/g, sNo),
        dTextTop["innerHTML"] = tTop, dTextTop["style"]["fontSize"] = tSize + "px", dTextTop["style"]["lineHeight"] = "1.2", dTextTop["style"]["fontFamily"] = sFont, dTextTop["style"]["textAlign"] = sAlign, dTextTop.style.color = sTextColor, rWrap["appendChild"](dTextTop), dTextBottom["style"].fontSize = tSize + "px", dTextBottom["style"].lineHeight = 1.2, dTextBottom["style"]["fontFamily"] = sFont, dTextBottom["style"]["textAlign"] = sAlign, dTextBottom.style["color"] = sTextColor, dTextBottom["innerHTML"] = tBottom;
      let dbLoc = mStar.getAttribute("firebaseURL");
      if (dbLoc === null) dbLoc = "Error! Missing attribute firebaseURL='https://YOUR-FIREBASE.firebaseio.com'."; else {
        if (dbLoc == "") dbLoc = "Error! Missing Firebase DB URL - 'firebaseURL' attribute."; else {
          if (dbLoc["indexOf"]("https://") !== 0) dbLoc = "Error! Invalid Firebase URL."; else {
            if (dbLoc["lastIndexOf"]("firebaseio.com") < 5) dbLoc = "Error! Invalid Firebase URL."; else dbLoc["lastIndexOf"]("/") !== dbLoc.length - 1 && (dbLoc = dbLoc + "/");
          }
        }
      }
      let starWrap = document["createElement"]("div");
      starWrap["style"]["width"] = sSize * sNo + "px", starWrap["style"]["display"] = "inline-block", rWrap["appendChild"](starWrap);
      //Star Render
      for (let i = 1; i <= sNo; i++) {
        let eStar = document["createElement"]("mStar");
        eStar["style"]["display"] = "inline-block", eStar["style"].width = sSize + "px", eStar.style["cursor"] = !localStorage["bsrgl_" + sRN] && !sStatus ? "pointer" : "default";
        !sStatus && (eStar["onmouseenter"] = function () {
          //console.log(localStorage["bsrgl_" + sRN]);
          if (!localStorage["bsrgl_" + sRN]) {
            let st = rWrap["getElementsByTagName"]("mStar");
            for (let j = 0; j < st["length"]; j++) {
              j < i ? (st[j]["querySelector"]("full").style["width"] = "0%", st[j]["querySelector"]("empty")["style"]["width"] = "0%", st[j]["querySelector"]("hover")["style"]["width"] = "100%") : (st[j]["querySelector"]("full").style["width"] = "0%", st[j]["querySelector"]("hover").style["width"] = "0%", st[j]["querySelector"]("empty")["style"]["width"] = "100%", st[j]["querySelector"]("empty")["querySelector"]("img")["style"]["margin"] = "0 0 0 0");
            }
            if (tTop != "") dTextTop["innerHTML"] = i + "/" + sNo;
          } else rWrap["title"] = tDone["replace"](/\$userRating\$/g, localStorage["bsrgl_" + sRN]), rWrap["style"]["cursor"] = "default";
          //console.log(localStorage["bsrgl_" + sRN]);
        });
        eStar["setAttribute"]("value", i);
        let eFStar = document["createElement"]("full"); eFStar["style"]["display"] = "inline-block", eFStar["style"]["overflow"] = "hidden";
        let eEStar = document["createElement"]("empty"); eEStar["style"]["display"] = "inline-block", eEStar["style"].overflow = "hidden";
        let eHStar = document["createElement"]("hover"); eHStar["style"]["display"] = "inline-block", eHStar["style"]["overflow"] = "hidden";
        let sEImg = document.createElement("img"); sEImg.style["background"] = "transparent", sEImg["src"] = sEmptyImg, sEImg["style"]["border"] = "0", sEImg["style"]["padding"] = "0", sEImg["style"]["margin"] = "0", sEImg.style.maxWidth = "none";
        let sFImg = document["createElement"]("img"); sFImg["style"]["background"] = "transparent", sFImg["src"] = sFullImg, sFImg.style["border"] = "0", sFImg["style"].padding = "0", sFImg["style"]["margin"] = "0", sFImg["style"]["maxWidth"] = "none";
        let sHImg = document["createElement"]("img"); sHImg["style"]["background"] = "transparent", sHImg["style"]["border"] = "0", sHImg["style"].padding = "0", sHImg["style"].margin = "0", sHImg["style"]["maxWidth"] = "none", sHImg["src"] = sHoverImg, sEImg.style.width = sSize + "px", sFImg.style["width"] = sSize + "px", sHImg.style["width"] = sSize + "px", eStar["style"]["lineHeight"] = "0", eFStar["appendChild"](sFImg), eEStar["appendChild"](sEImg), eHStar["appendChild"](sHImg), eStar["appendChild"](eFStar), eStar["appendChild"](eEStar), eStar.appendChild(eHStar), starWrap["appendChild"](eStar);
      }
      rWrap["appendChild"](dTextBottom), sRender(rWrap, 0, sSize);
      if (dbLoc["indexOf"]("Firebase error") < 0) {
        const dbInitOptions = {};
        dbInitOptions.databaseURL = dbLoc;
        let dbInitApp = firebase.initializeApp(dbInitOptions, sRN + mStarExists),
          dbInit = dbInitApp["database"]()["ref"]("StarRatingSystem/" + mSite + "/" + sRN);
        dbInit.on("value", dbVal => {
          let rArr = dbVal["val"]();

          if (!rArr) {
            const rInit = {};
            rInit.OO = 0, //rating
              rInit.O0 = 0, //votes
              rArr = rInit;
          }
          sRender(rWrap, rArr.OO * sNo, sSize);
          if (rWrap["contains"](sLoader)) sLoader["remove"]();
          starWrap["onmouseleave"] = function () { sRender(rWrap, rArr.OO * sNo, sSize), dTextTop["innerHTML"] = tTop; },
            rWrap["querySelectorAll"](".mStars-average").forEach(element => element["textContent"] = Math["round"](rArr.OO * sNo * 100) / 100),
            rWrap["querySelectorAll"](".mStars-votes")["forEach"](element => element["textContent"] = rArr.O0),
            !sStatus && rWrap.querySelectorAll("mStar")["forEach"]((element, index) => {
              element["onclick"] = function () {
                if (!localStorage["bsrgl_" + sRN]) {
                  var newRating = (rArr.OO * rArr.O0 + (index + 1) / sNo) / (rArr.O0 + 1);
                  const rArrUpdate = {};
                  rArrUpdate.OO = newRating,
                    rArrUpdate.O0 = rArr.O0 + 1,
                    dbInit["set"](rArrUpdate),
                    localStorage["bsrgl_" + sRN] = index + 1,
                    rWrap["querySelectorAll"]("mStar").forEach(element => element["style"]["cursor"] = "default"),
                    sClickTip(tThanks, rWrap, index + 1),
                    dTextTop["innerHTML"] = tTop;
                } else sClickTip(tDone, rWrap, localStorage["bsrgl_" + sRN]);
                console.log(localStorage["bsrgl_" + sRN]);

              };
            });
        });
      } else rWrap["innerHTML"] = dbLoc;
    }
    function starInit(v5) {
      //fires myshon if firebase database is ready
      typeof firebase == "object" && typeof firebase["database"] == "function" && typeof firebase["initializeApp"] == "function" ? mStarRating(v5) : setTimeout(function () { starInit(v5); }, 50);
    }
    starInit(mStarExists);
  }(mStarCreator);