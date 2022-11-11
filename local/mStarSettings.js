var mSettings = {
  "default": {
    "firebaseURL": "https://bloggerstars-38cc6-default-rtdb.firebaseio.com/",
    "fullStarImg": 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" stroke="white" class="bi bi-star-fill" viewBox="0 0 16 16">%0A  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>%0A</svg>',
    "emptyStarImg": 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="silver" stroke="white" class="bi bi-star-fill" viewBox="0 0 16 16">%0A  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>%0A</svg>',
    "hoverStarImg": 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" class="bi bi-star-fill" viewBox="0 0 16 16">%0A  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>%0A</svg>',
    "numberOfStars": "5",
    "starSize": "30",
    "textSize": "",
    "textColor": "",
    "fontFamily": "",
    "align": "", 
    "topText": "",
    "bottomText": "$average$ / $max$ ($votes$ votes)",
    "thankYouText": "Thanks for voting!",
    "blockingText": "You rated us $userRating$ star!",
    "position": "bottom",
    "status": "readonly"   
  },
  "postPage": {"status": "active" },
  "staticPage": {"status": "active"}
}
    function pathFormat(mSite) {
      let e = mSite.split("?")[0].split("#")[0].replace("https:", "").replace("http:", "").replace("file:", "").replace("ftp:", "").replace("mailto:", "");
      for (; "/" == e[0];)e = e.substring(1);
      for (0 === e.indexOf("www.") && (e = e.replace("www.", "")); "/" == e[e.length - 1];)e = e.substring(0, e.length - 1);
      //      console.log({e});
      return e = e.replace(/\./g, "_").replace(/\//g, "__").replace(/\,/g, "___").replace(/\s/g, "");
    }

    //Assign Settings by Type of Page
let settings = /.*\/\d{4}\/\d{2}\/.*\.html/.test(location.href.split("?")[0].split("#")[0]) ? mSettings.postPage : /.*\/p\/.*\.html/.test(location.href.split("?")[0].split("#")[0]) ? mSettings.staticPage : mSettings.indexPage,
  dSettings = mSettings.default;
for (let t in dSettings) (typeof (settings[t]) == "undefined") && (settings[t] = dSettings[t]);

let mainScript = document.createElement("script"); for (let t in settings) mainScript.setAttribute(t, settings[t]); mainScript.setAttribute("id", "mStars"), mainScript.setAttribute("ratingName", pathFormat(location.href)), mainScript.src = "http://127.0.0.1:8887/mStarCore.js", document.getElementById("mStarsRating").appendChild(mainScript);

    //add JSON for SEO