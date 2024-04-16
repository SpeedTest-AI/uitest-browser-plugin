// Event listener for button click
document.addEventListener("DOMContentLoaded", async function () {
        document.getElementById("generate").addEventListener("click", async () => {
                const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
                let range = document.getElementById("range");
                if (range.value === "selectedPage") { const response = await chrome.tabs.sendMessage(tab.id, { action: "getSelectedHTML" }); }
                else { const response = await chrome.tabs.sendMessage(tab.id, { action: "getWholeHTML" }) };
        });

        document.getElementById("clear").addEventListener("click", function () {
                document.getElementById("result").value = ""
        })
        document.getElementById("copy").addEventListener("click", function () {
                let copiedText = document.getElementById("result");
                copiedText.select();
                copiedText.setSelectionRange(0, 99999); //For mobile devices
                navigator.clipboard.writeText(copiedText.value);
        })
});

function getMiddleRowContent(bodyContent, numRows) {
        const lines = bodyContent.split('\n');
        if (lines.length > numRows) {
                const startIndex = Math.floor((lines.length - numRows) / 2);
                const endIndex = startIndex + numRows;
                const middleRows = lines.slice(startIndex, endIndex);
                return middleRows.join('\n');
        } else {
                return bodyContent
        }
}

// function geneareLocator() { }

chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
                console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
                console.log(request.pageHTML)
                if (request.type === "getWholeHTML") {
                        const number = document.getElementById('number').value;
                        document.getElementById("result").value = getMiddleRowContent(request.pageHTML, number);
                }
                else if (request.type === "getSelectedHTML") { document.getElementById("result").value = request.pageHTML; }
        }
);