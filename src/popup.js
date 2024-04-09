// // Function to handle button click event
// async function handleButtonClick() {
//         try {
//                 const type = document.getElementById("range").value;
//                 const response = await sendMessageToBackground({ action: "generate", type: type });
//                 if (response && response.htmlContent) {
//                         generateLocator(response.htmlContent);
//                 }
//         } catch (error) {
//                 console.error("Error:", error);
//         }
// }

// // Function to send message to background script
// function sendMessageToBackground(message) {
//         return new Promise((resolve, reject) => {
//                 chrome.runtime.sendMessage(message, function (response) {
//                         if (chrome.runtime.lastError) {
//                                 reject(chrome.runtime.lastError.message);
//                         } else {
//                                 resolve(response);
//                         }
//                 });
//         });
// }

// // Function to generate locator based on tool and HTML content
// function generateLocator(htmlContent) {
//         const tool = document.getElementById("tool").value;
//         // Call the function to generate locator
//         // const locator = generateLocator(tool, htmlContent); // Replace with your implementation
//         // Display the result in textarea
//         document.getElementById("result").value = htmlContent;
// }

// // Event listener for button click
// document.addEventListener("DOMContentLoaded", function () {
//         document.getElementById("generate").addEventListener("click", handleButtonClick);
// });
