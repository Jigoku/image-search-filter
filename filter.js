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

    Image Search Filter
	remove spam sites from the google image search results

	By Ricky K. Thomson (Jigoku)
	https://github.com/Jigoku/image-search-filter

	Credit to 'erosman' on irc.mozilla.org for helping with this

*/

var total = 0;


// Callback function to execute when mutations are observed
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if (mutation.type === 'childList') {
			for (const item of mutation.target.childNodes) {
				hidespam(item);
			}
		}
	});
	//observer.disconnect();
});
var obconfig = { childList: true };

// start an observer to listen for new nodes
observer.observe(document.getElementById('rg_s'), obconfig);


// remove initial results
for (const item of document.querySelectorAll('div.rg_bx')) {
	hidespam(item);
}


function hidespam(item) {
	// hide spam from results

	if (!(/spam/.test(item.className))) {
		//console.log("found spam! " + total);
		if (/(.)?(pinterest\.(com|co\.uk)|pinimg\.com)/i.test(item.textContent)) {

			// tag matches, so we only count them once
			item.className = item.className + " spam";

			// hide the object
			item.style.position = "absolute";
			item.style.height = '0px';
			item.style.width = '0px';

			// increment badge counter
			++total;
			notifyBackgroundPage(total.toString());
		}
	}
}


function notifyBackgroundPage(str) {
	// send string to badge counter
	var sending = browser.runtime.sendMessage({
		text: str
	});
}






