let selectedContent = '';
// Function to handle mouseup event
function handleMouseUp(event) {
        // Get selected text
        selectedContent = window.getSelection().toString().trim();
        console.log("---get selected content---" + selectedContent)
}
document.addEventListener('mouseup', handleMouseUp);

chrome.runtime.onMessage.addListener(
        async function (message, sender, sendResponse) {
                console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension,message action: " + message.action);
                if (message.action === "getWholeHTML") { await chrome.runtime.sendMessage({ type: "getWholeHTML", pageHTML: document.body.outerHTML }) }
                else if (message.action === "getSelectedHTML") { await chrome.runtime.sendMessage({ type: "getSelectedHTML", pageHTML: selectedContent }) }
        }
);