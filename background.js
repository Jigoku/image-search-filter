
function handleMessage(request, sender, sendResponse) {
	//	console.log("Message from the content script: " +request.text);
	browser.browserAction.setBadgeText({text: request.text });
	//	sendResponse({response: "Response from background script"});
}

browser.runtime.onMessage.addListener(handleMessage);

