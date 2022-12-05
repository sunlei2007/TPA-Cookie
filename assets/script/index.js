'use strict';
 
const modalOne = document.querySelector(".dialog-one");
const modalTwo = document.querySelector(".dialog-two");
const btnAccept = document.querySelector(".btn-accept");
const btnSet = document.querySelector(".btn-set");
const btnSave = document.querySelector(".btn-save");

const switchBrowser = document.querySelector(".chk-browser");
const switchOS = document.querySelector(".chk-OS");
const switchSW = document.querySelector(".chk-SW");
const switchSH = document.querySelector(".chk-SH");


window.onload = function () {
   
    setTimeout(() => {
        
        if (navigator.cookieEnabled && !document.cookie)
        {
          modalOne.showModal();
        }
    }, 100);
     
    if (document.cookie) {
        if (getCookie("browser") === "true") {
            console.log(`Browser: ${getBrowserInfo()}`);
        }
        if (getCookie("operator system") === "true") {
            console.log(`OS: ${getOSInfo()}`);
        }
        if (getCookie("screen width") === "true") {
            console.log(`Screen width: ${screen.width}`);
        }
        if (getCookie("screen width") === "true") {
            console.log(`Screen width: ${screen.height}`);
        }
    }
}

btnAccept.onclick = function () {
    modalOne.close();
     
    setCookie("browser", "true", { "max-age": 20 }); //Add browser to cookie
    setCookie("operator system", "true", { "max-age": 20 });//Add operator system to cookie
    setCookie("screen width", "true", { "max-age": 20 });//Add screen width system to cookie
    setCookie("screen heigh", "true", { "max-age": 20 });//Add screen height system to cookie

}
btnSet.onclick = function () {
    modalOne.close();
    modalTwo.showModal();
}
btnSave.onclick = function () {

    setCookie("browser", switchBrowser.checked, { "max-age": 20 }); //Add browser to cookie
    setCookie("operator system", switchOS.checked, { "max-age": 20 });//Add operator system to cookie
    setCookie("screen width", switchSW.checked, { "max-age": 20 });//Add screen width system to cookie
    setCookie("screen heigh", switchSH.checked, { "max-age": 20 });//Add screen height system to cookie
    modalTwo.close();
}
getOSInfo();

function getOSInfo(){
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    if (isWin) return "Windows";
 
};
 
function getBrowserInfo() {

    function _Browser(name, identifier) {
        this.name = name;
        this.identifier = identifier;
    }

    const Firefox = new _Browser('Firefox', 'Firefox');
    const Opera = new _Browser('Opera', 'OPR');
    const MicrosoftEdge = new _Browser('Microsoft Edge', 'Edg');
    const Edge = new _Browser('Edge', 'Edge');
    const Safari = new _Browser('Safari', 'Safari');
    const Chrome = new _Browser('Chrome', 'Chrome');

    const browsers = [Firefox, Opera, MicrosoftEdge, Edge, Chrome, Safari];

    const { userAgent } = navigator;
    const browserInfo = browsers.find(({ identifier }) => userAgent.includes(identifier));

    return browserInfo.name;
}
 
function setCookie(name, value, options = {}) {
    options = {
        path: "/",
        SameStie: "Lax",
        ...options
    };
    const keys = Object.keys(options);
    const values = Object.values(options);
    //optional chaining operator
    if (options?.expires && options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updateCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    for (let i = 0; i < keys.length; i++) {
        updateCookie += `;${keys[i]}=${values[i]}`;
    }
    
    document.cookie = updateCookie;
}

function getCookie(name) {
    if (document.cookie) {
        let cookies = decodeURIComponent(document.cookie).split(";");
        const map = new Map();
        for (let i = 0; i < cookies.length; i++) {

            map.set(cookies[i].split("=")[0].trim(), cookies[i].split("=")[1].trim());
        }
        return map.get(name);
    }
}
