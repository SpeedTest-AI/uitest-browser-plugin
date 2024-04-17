// Event listener for button click
document.addEventListener("DOMContentLoaded", async function () {
        document.getElementById("generate").addEventListener("click", async () => {
                const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
                let range = document.getElementById("range");
                if (range.value === "selectedPage") {
                        const response = await chrome.tabs.sendMessage(tab.id, { action: "getSelectedHTML" });
                }
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

function geneareLocator(testTool, pageContent) {
        let spinner = document.getElementById("spinner");
        let generate = document.getElementById("generate");
        spinner.hidden = false;
        generate.disabled = true;
        fetch('http://127.0.0.1:9099/uitest/genWebLocator', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        testTool: testTool,
                        webPage: pageContent
                })
        })
                .then(response => response.json())
                .then(data => {
                        let code = JSON.stringify(data.locators, null, 2);
                        let formatedCode = code.replace(/(\n)/g, '')
                        let newCode = formatedCode.replace(/,/g, ',\n').replace(/{/g, '{\n').replace(/}/g, '\n}');
                        document.getElementById('result').value = newCode;
                })
                .catch(error => {
                        console.error('Error:', error);
                        document.getElementById('result').value = 'Failed to fetch data';
                }).finally(() => {
                        spinner.hidden = true;
                        generate.disabled = false;
                });
}

chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
                console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
                const testTool = document.getElementById('tool').value;
                if (request.type === "getWholeHTML") {
                        const number = document.getElementById('number').value;
                        let pageContent = getMiddleRowContent(request.pageHTML, number);
                        geneareLocator(testTool, pageContent)
                }
                else if (request.type === "getSelectedHTML") {
                        let pageContent = document.getElementById('result');
                        geneareLocator(testTool, pageContent)
                }
        }
);