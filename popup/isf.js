function saveOptions(e) {
//	browser.storage.sync.set({
	browser.storage.local.set({
		pattern: document.querySelector("#pattern").value
	});
	e.preventDefault();
}

function restoreOptions() {
  var storageItem = browser.storage.managed.get('pattern');
  storageItem.then((res) => {
    document.querySelector("#managed-pattern").innerText = res.pattern;
  });

  //var gettingItem = browser.storage.sync.get('pattern');
  var gettingItem = browser.storage.local.get('pattern');
  gettingItem.then((res) => {
    document.querySelector("#pattern").value = res.pattern || '//i';
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

