// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
        try {
                if (request.action === "generate") {
                        const response = await sendMessageToContentScript(request);
                        sendResponse(response);
                }
        } catch (error) {
                console.error("Error:", error);
        }
});

// Function to send message to content script
function sendMessageToContentScript(message) {
        return new Promise((resolve, reject) => {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
                                if (chrome.runtime.lastError) {
                                        reject(chrome.runtime.lastError.message);
                                } else {
                                        resolve(response);
                                }
                        });
                });
        });
}
