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

var count = 0;

//remove spam on page load
for (const item of document.querySelectorAll('div.rg_bx')) {
	hidespam(item);
}


// create observer to remove new results (added on scrolling)
//   mutation api notes https://developer.mozilla.org/en-US/docs/Web/API/Node
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if (mutation.type === 'childList') {
			for (const item of mutation.target.childNodes) {
				hidespam(item);
			}
		}

		//observer.disconnect();
	});
});
var obconfig = { childList: true }

observer.observe(document.getElementById('rg_s'), obconfig);



//hide spam results matching this regex
function hidespam(node) {
	if (/(.)?(pinterest\.(com|co\.uk)|pinimg\.com)/i.test(node.textContent)) {
		node.style.height = '0px';
		node.style.width = '0px';
		node.textContent = "";
		++count;
		notifyBackgroundPage(count.toString());
	}
}


function handleResponse(message) {
	console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
 	console.log(`Error: ${error}`);
}

function notifyBackgroundPage(str) {
	var sending = browser.runtime.sendMessage({
		text: str
	});
	sending.then(handleResponse, handleError);
}

