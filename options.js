function saveOptions(e) {
	console.log("storing options");
	e.preventDefault();
	browser.storage.sync.set({
	//browser.storage.local.set({
		pattern: document.querySelector("#pattern").value
	});
}

function restoreOptions() {
	function setCurrentChoice(result) {
		document.querySelector("#pattern").value = result.pattern || "//i";
	}

	function onError(error) {
		console.log(`Error: ${error}`);
	}

	//var getting = browser.storage.local.get("pattern");
	var getting = browser.storage.sync.get("pattern");
	getting.then(setCurrentChoice, onError);

	console.log("restoring saved options");
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
