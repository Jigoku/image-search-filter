// used for setting the badge counter

function handleMessage(request) {
	browser.browserAction.setBadgeText({text: request.text });
}

browser.runtime.onMessage.addListener(handleMessage);
