// Event listener for button click
document.addEventListener("DOMContentLoaded", async function () {
        document.getElementById("generate").addEventListener("click", async () => {
                const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
                const response = await chrome.tabs.sendMessage(tab.id, { action: "getPageHTML" });
                console.log(response);
        });
});

chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
                console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
                if (request.pageHTML)
                        document.getElementById("result").value = request.pageHTML;
        }
);
