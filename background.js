// used for setting the badge counter

function handleMessage(request) {
	browser.browserAction.setBadgeText({text: request.text });
}

browser.runtime.onMessage.addListener(handleMessage);


/*
function saveOptions(e) {
	browser.storage.sync.set({
	//browser.storage.local.set({
		pattern: document.querySelector("#pattern").value
	});
	e.preventDefault();
}

function restoreOptions() {
	var gettingItem = browser.storage.sync.get('pattern');
	//var gettingItem = browser.storage.local.get('pattern');
	gettingItem.then((res) => {
		document.querySelector("#pattern").value = res.pattern || '//i';
	});
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
*/
