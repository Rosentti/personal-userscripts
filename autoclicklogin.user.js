// ==UserScript==
// @name         Wilma auto-click login button
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  many do
// @author       You
// @downloadURL  https://github.com/20PercentRendered/personal-userscripts/raw/master/autoclicklogin.user.js
// @updateURL    https://github.com/20PercentRendered/personal-userscripts/raw/master/autoclicklogin.user.js
// @match        https://riveria.inschool.fi/
// @match        https://riveria.inschool.fi/login?sessionexpired
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    Array.from(document.getElementsByTagName("button")).find(e => e.innerText === 'Riverian verkon tunnus').click();
})();
