// ==UserScript==
// @name         opi auto login
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://opi.riveria.fi/moodle/login/riverialogin/custom_login.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=riveria.fi
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    location.href = "https://opi.riveria.fi/moodle/auth/oidc/"
    // Your code here...
})();
