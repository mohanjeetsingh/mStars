var mSettings = {
  "postPage" : {
    "firebaseURL" : "https://bloggerstars-38cc6-default-rtdb.firebaseio.com/",
    "fullStarImg" : "https://1.bp.blogspot.com/-Cu-6HVlWv58/W32lLH0geEI/AAAAAAAAADE/JdnSiw6yssouLUWAkfsncZgqEZvRfcU9ACLcBGAs/s1600/srs3.png",
    "emptyStarImg" : "https://1.bp.blogspot.com/-65xU3Q8_Qok/W32lK9AtKRI/AAAAAAAAADI/m0Xx6lyFkqsovtvNB-3Uc-ef1acXSYV_ACLcBGAs/s1600/srs1.png",
    "hoverStarImg" : "https://1.bp.blogspot.com/-RZtr3oAy6nQ/W32lLGv4wbI/AAAAAAAAADM/x70io1OOmZAjNHnAknTIjLGRErp0gyXmQCLcBGAs/s1600/srs2.png",
    "numberOfStars" : "5",
    "starSize" : "50",
    "textSize" : "15",
    "textColor" : "red",
    "fontFamily" : "",
    "align" : "center",
    "topText" : "",
    "bottomText" : "$average$ / $max$ ($votes$ votes)",
    "thankYouText" : "Thanks for voting!",
    "blockingText" : "You rated us $userRating$ star!",
 "position" : "bottom",
    "status" : "active"
  },
  "indexPage" : {
    "firebaseURL" : "https://bloggerstars-38cc6-default-rtdb.firebaseio.com/",
    "fullStarImg" : "https://1.bp.blogspot.com/-Cu-6HVlWv58/W32lLH0geEI/AAAAAAAAADE/JdnSiw6yssouLUWAkfsncZgqEZvRfcU9ACLcBGAs/s1600/srs3.png",
    "emptyStarImg" : "https://1.bp.blogspot.com/-65xU3Q8_Qok/W32lK9AtKRI/AAAAAAAAADI/m0Xx6lyFkqsovtvNB-3Uc-ef1acXSYV_ACLcBGAs/s1600/srs1.png",
    "hoverStarImg" : "https://1.bp.blogspot.com/-RZtr3oAy6nQ/W32lLGv4wbI/AAAAAAAAADM/x70io1OOmZAjNHnAknTIjLGRErp0gyXmQCLcBGAs/s1600/srs2.png",
    "numberOfStars" : "5",
    "starSize" : "30",
    "textSize" : "15",
    "textColor" : "#292929",
    "fontFamily" : "",
    "align" : "center",
    "topText" : "",
    "bottomText" : "$average$ / $max$ ($votes$ votes)",
    "thankYouText" : "Thanks for voting!",
    "blockingText" : "You rated us $userRating$ star!",
    "position" : "bottom",
    "status" : "readonly"
  },
  "staticPage" : {
    "firebaseURL" : "https://bloggerstars-38cc6-default-rtdb.firebaseio.com/",
    "fullStarImg" : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" class="bi bi-star-fill" viewBox="0 0 16 16">%0A  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>%0A</svg>',
    "emptyStarImg" : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="silver" class="bi bi-star-fill" viewBox="0 0 16 16">%0A  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>%0A</svg>',
    "hoverStarImg" : '',
    "numberOfStars" : "5",
    "starSize" : "50",
    "textSize" : "15",
    "textColor" : "green",
     "fontFamily" : "",
    "align" : "center",
    "topText" : "",
    "bottomText" : "$average$ / $max$ ($votes$ votes)",
    "thankYouText" : "Thanks for voting!",
    "blockingText" : "You rated us $userRating$ star!",
 "position" : "bottom",
    "status" : "active"
  }
}
!function () {
  if ("undefined" == typeof BloggerRatingGenerator) { //first run check
    let postClass = [".post", ".post-outer", "article", ".item", ".blog-post", ".hentry", ".index-post"],
      postTitle = [".post-title", "h1", "h2", "h3"],
      blogID = ["#main", "#Blog1", "#Blog00"];
    function locCheckFn(element) {
      if ("A" === element.tagName && element.getAttribute("href")) {
        let r = element.getAttribute("href").split("?")[0].split("#")[0];
        return 0 === r.indexOf(location.protocol + "//" + location.host) && /.*\/\d{4}\/\d{2}\/.*\.html/.test(r) ? element : element.parentNode && "main" !== element.parentNode.id && element.parentNode !== document.body ? locCheckFn(element.parentNode) : null
      }
 //     console.log({e: element,r: mainCreator});
    }
    function pathFormat(mSite) {
      let e = mSite.split("?")[0].split("#")[0].replace("https:", "").replace("http:", "").replace("file:", "").replace("ftp:", "").replace("mailto:", "");
      for (; "/" == e[0];)e = e.substring(1);
      for (0 === e.indexOf("www.") && (e = e.replace("www.", "")); "/" == e[e.length - 1];)e = e.substring(0, e.length - 1);
//      console.log({e});
      return e = e.replace(/\./g, "_").replace(/\//g, "__").replace(/\,/g, "___").replace(/\s/g, "");      
    }
    function mainCreator(t, r, l, i) {
      let mainWrap = document.createElement("div"); mainWrap.setAttribute("class", "BloggerStarRating mt-5"), "insertAfter" === l ? t.parentNode.insertBefore(mainWrap, t.nextSibling) : t.appendChild(mainWrap);
      let mainScript = document.createElement("script"); for (let t in i) mainScript.setAttribute(t, i[t]); mainScript.setAttribute("id","mStars"), mainScript.setAttribute("ratingName", pathFormat(r)), mainScript.src = "http://127.0.0.1:8887/mStarCore.js", mainWrap.appendChild(mainScript)
    }
    function callMainCreator(element, settings) {
      let i, s, a = pathFormat(location.href);
      "top" === settings.position ? (i = postTitle, s = postClass) : (i = postClass, s = postTitle);
      for (let e = 0; e < i.length; e++){
        if (element.querySelector(i[e])) {
          mainCreator(element.querySelector(i[e]), a, "top" === settings.position ? "insertAfter" : "appendChild", settings);
          break
        }
        if (e === i.length - 1) for (let e = 0; e < s.length; e++){
          if (element.querySelector(s[e])) {
            mainCreator(element.querySelector(s[e]), a, "top" === settings.position ? "appendChild" : "insertAfter", settings); break
          }
          if (e === s.length - 1) {
            let t = document.createElement("div"); document.body.appendChild(t), t.style.display = "block", t.style.position = "fixed", t.style.left = "0", t.style.bottom = "0", t.style.background = "lightblue", t.style.borderTop = "1px solid black", mainCreator(t, a, "appendChild", settings)
          }
        }
      }
    }
    function postFn(element, settings) {
      for (let i = 0; i < postClass.length; i++){
        if (element.querySelector(postClass[i])) {
          element.querySelectorAll(postClass[i]).forEach(e => {
            if (!e.querySelector(".BloggerStarRating")) {
              let i = e.querySelectorAll("a[href]");
              if (i.length) for (let n = 0; n < i.length; n++){
                let o = i[n].getAttribute("href").split("?")[0].split("#")[0];
                if (0 === o.indexOf(location.protocol + "//" + location.host) && /.*\/\d{4}\/\d{2}\/.*\.html/.test(o)) { mainCreator(i[n], o, "insertAfter", settings); break }
                if (n === i.length - 1) { let i = locCheckFn(e); i && mainCreator(i, i.getAttribute("href"), "insertAfter", settings) }
              } else { let i = locCheckFn(e); i && mainCreator(i, i.getAttribute("href"), "insertAfter", settings) }
            }
          }); break
        }
        if (i === postClass.length - 1) {
          let t = [];
          element.querySelectorAll("a[href]").forEach(e => {
            let i = e.getAttribute("href").split("?")[0].split("#")[0];
            0 === i.indexOf(location.protocol + "//" + location.host) && /.*\/\d{4}\/\d{2}\/.*\.html/.test(i) && t.indexOf(i) < 0 && (mainCreator(e, i, "insertAfter", settings), t.push(i))
          })
        }
      }
    }
    !function docReadyCheck(e) {/in/.test(document.readyState) ? setTimeout(function () { docReadyCheck(e) }, 100) : e()}
      (function () {
      let element = document.body;
        for (let e = 0; e < blogID.length; e++){ document.querySelector(blogID[e]) && (element = document.querySelector(blogID[e])); break }
//        console.log({ t });
        //Type of page identifier >>
      /.*\/\d{4}\/\d{2}\/.*\.html/.test(location.href.split("?")[0].split("#")[0]) ? callMainCreator(element, mSettings.postPage) : /.*\/p\/.*\.html/.test(location.href.split("?")[0].split("#")[0]) ? callMainCreator(element, mSettings.staticPage) : (postFn(element, mSettings.indexPage), setInterval(function () { postFn(element, mSettings.indexPage) }, 1e3))
    })
  } else BloggerRatingGenerator = !0 }();
