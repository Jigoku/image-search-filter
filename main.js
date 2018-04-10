/*
 * Copyright (C) 2018 Ricky K. Thomson
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * u should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.

    Image Search Filter for Firefox Quantum.
	Remove spam sites from the google image search results

	By Ricky K. Thomson (Jigoku)
	https://github.com/Jigoku/image-search-filter

	Credit to 'erosman' on irc.mozilla.org for helping with this

*/

// TODO, div class tags are reset on window resize, so find
// eventlistener that will rerun function hidespam() when resized
//window.addEventListener('resize', test());


// stores the total of filtered results
var total = 0;

// callback function to execute when mutations are observed
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if (mutation.type === 'childList') {
			for (const item of mutation.target.childNodes) {
				hidespam(item);
			}
		}
	});
});

// only check for new children added to parent node
var obconfig = { childList: true };

// start an observer to listen for new nodes
// rg_s is the parent node of the inserted search result elements
observer.observe(document.getElementById('rg_s'), obconfig);


// remove initial results on first run
// each result element has class rg_bx
for (const item of document.querySelectorAll('div.rg_bx')) {
	hidespam(item);
}

function hidespam(item) {
	// hide unwanted spam from results

	// check if we added className with "isf-filtered"
	if (!(/isf-filtered/.test(item.className))) {

		// check for matching spam sites
		// TODO read "pattern" from  browser.storage.sync.get("pattern")
		if (/(.)?(pinterest\.(com|co\.uk)|pinimg\.com)/i.test(item.textContent)) {

			// when content matches, tag it so we don't count it multiple times
			item.className = item.className + ' isf-filtered';

			// hide the object
			// toggling visibility or display breaks image preview <a> tag's
			// so set to 0 pixels and move position
			item.style.position = 'absolute';
			item.style.height = '0px';
			item.style.width = '0px';

			// increment badge counter
			++total;
			notifyBackgroundPage(total.toString());
		}
	}
}


// send string to badge counter
// this lets us see how many elements were filtered by matching hidespam()
function notifyBackgroundPage(str) {
	var sending = browser.runtime.sendMessage({
		text: str
	});
}



// test settings support
// this doesn't do anything at all ?
// see options.js
function onError(error) {
	console.log(`Error: ${error}`);
}

function onGot(item) {
	var pattern = "//i";
	if (item.pattern) {
		pattern = item.pattern;
	}
}

var getting = browser.storage.sync.get("pattern") || "test";
getting.then(onGot, onError);

// EOF
