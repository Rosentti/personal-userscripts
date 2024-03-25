// ==UserScript==
// @name         Riveria wilma adblock
// @namespace    http://tampermonkey.net/
// @version      2024-03-22
// @description  try to take over the world!
// @author       You
// @match        https://riveria.inschool.fi/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=riveria.fi
// @grant        unsafeWindow
// @run-at  document-start
// ==/UserScript==

(function() {
    "use strict";
    let ads_b64 = ["UHlybyBPcGlza2VsaWpha3VudGEgKE8uUCk=", "Uml2ZXJpYW4gdmllc3RpbnTkICAoLlIp", "TGlsamEgSmFubmUgKEpBTkxJTCk=", "I09waW50b3RvaW1pc3RvIFdpbG1hIChUb2ltaXN0by1XaWxtYSk=", "U3VvbWFsYWluZW4gRWV2YSAoU3VvbWFsLUVldmEp", "SGlsbGkgVG9tbWkgKEhpbGxpLVRvbW1pKQ==", "VHV0a2ludG9rb3VsdXR1cyBUaWVkb3R1cyAoT3BwYWx2KQ==", "ZVJpdmVyaWEgVGllZG90dXMgKGVSaXZlcmlhLVRpZWRvdCk=", "VGFrYWxhIFRhbmphIChUYWthbGEtVGFuamEp", "CVV0cmlhaW5lbiBTaXJwYSAoUy5VKQ==", "RXJvbmVuIElsa2thIChFcm9uZW4tSWxra2Ep"];
    let ads = [];
    ads_b64.forEach(a =>
    {
       ads.push(atob(a));
    });

    ads.forEach(a =>
    {
       console.log(a);
    });

    var oldFunction = unsafeWindow.XMLHttpRequest;
    unsafeWindow.XMLHttpRequest = function() {
        var xhr = new oldFunction();
        var orig = {
            open: xhr.open.bind(xhr),
            send: xhr.send.bind(xhr),
        }

        xhr.open = function(method, url, async, user, password) {
            Object.defineProperty(xhr, '_radb_url', {
                value: url,
                writable: false,
            });

            console.log("open hook");
            console.log("method: " + method + ", url: " + url + ", async: " + async + ", user: " + user + ", password: " + password);
            return orig.open(method, url, async, user, password);
        };

        xhr.send = function(body) {
            if (xhr._radb_url.endsWith("/messages/list")) {
                console.log("send hook");
                console.log("body: " + body);
                let origEvent = xhr.onload;
                xhr.onload = (e) => {
                    console.log("onload");
                    console.log(e);

                    // Rewrite message if it's the one we want
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            var json = JSON.parse(xhr.responseText);
                            console.log("orig");
                            console.log(json);

                            var newjson = {Status: 200, Messages: []};
                            json.Messages.forEach(msg => {
                                console.log(`"${msg.Sender}", blocked ${ads.includes(msg.Sender)}`);
                                if (!ads.includes(msg.Sender)) {
                                    newjson.Messages.push(msg);
                                }
                            });

                            var newtext = JSON.stringify(newjson);
                            Object.defineProperty(xhr, 'responseText', {
                                value: newtext,
                                writable: true,
                            });

                            Object.defineProperty(xhr, 'response', {
                                value: newtext,
                                writable: true,
                            });

                            xhr.responseText = JSON.stringify(newjson);
                            xhr.response = xhr.responseText;
                            console.log("rewrote");
                            console.log(newjson);
                        } else {
                            console.error(xhr.statusText);
                        }
                    }
                    origEvent(e);
                };
            }
           
            let ret = orig.send(body);

            return ret;
        };

        return xhr;
    };
})();
