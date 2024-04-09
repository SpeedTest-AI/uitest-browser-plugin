// // content.js

// // Listen for messages from the background script
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//         try {
//                 if (request.action === "getHTML") {
//                         if (request.type === "selectedPage") {
//                                 // Get the selected HTML and send it to the background script
//                                 const selectedHTML = window.getSelection().toString();
//                                 sendResponse({ htmlContent: selectedHTML });
//                         } else if (request.type === "wholePage") {
//                                 // Get the whole page HTML and send it to the background script
//                                 const wholePageHTML = document.documentElement.outerHTML;
//                                 sendResponse({ htmlContent: wholePageHTML });
//                         }
//                 }
//         } catch (error) {
//                 console.error("Error:", error);
//         }
// });
