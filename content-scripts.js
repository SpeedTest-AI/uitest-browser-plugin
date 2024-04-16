chrome.runtime.onMessage.addListener(
        async function (message, sender, sendResponse) {
                console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
                //         if (message.action === "getPageHTML")
                //                 sendResponse({ pageHTML: document.documentElement.outerHTML });
                // }
                if (message.action === "getPageHTML") { await chrome.runtime.sendMessage({ pageHTML: document.documentElement.outerHTML }) }
        }
);
