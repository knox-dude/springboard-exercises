const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];


/**
 * Get entries in fruit that have str as a substring
 * 
 * @param {string} str - takes userInput from searchHandler
 * @returns {Array} a matching entries in fruits
 */
function search(str) {
	if (str === '') return [];
	let results = [];
	results = fruit.filter(val => (val.toLowerCase().indexOf(str) != -1));
	return results;
}

/**
 * Function that displays search results on keyup event
 * 
 * @param {Event} e - keyup event
 */
function searchHandler(e) {
	const userInput = e.target.value.toLowerCase();
	const fruitRemaining = search(userInput); 		// filter from list fruit
	suggestions.innerHTML = ''; 					// clear outdated list from last search
	showSuggestions(fruitRemaining, userInput); 	// show suggestions for current search
}

/**
 * Populates suggestions with modified output from search
 * 
 * @param {Array} results - output from search() that matches user's input
 * @param {string} inputVal - user's input from the search bar.
 */
function showSuggestions(results, inputVal) {
	for (let result of results) {
		const newLi = document.createElement('li');
		const boldedResult = boldSubstring(result, inputVal) //turn userInput part of result into bold 
		newLi.innerHTML = boldedResult;
		suggestions.appendChild(newLi);
	}
}

/**
 * Surrounds the string subStr within str with \<b>\</b>
 * @param {string} str - string with substring subStr
 * @param {string} subStr - string used to find bold idx
 * @returns {string} returns a copy of str with subStr bolded
 * @example
 * boldSubstring('Apple', 'pl'); // returns "Ap<b>pl</b>e"
 */
function boldSubstring(str, subStr) {
	// get starting and ending idx of subStr in str
	const startIdx = str.toLowerCase().indexOf(subStr);
	const endIdx = startIdx+subStr.length;

	let strArray = str.split('');
	strArray.splice(endIdx, 0, '</b>')
	strArray.splice(startIdx, 0, '<b>');

	return strArray.join('')
}

/**
 * Highlights the list item the user is hovering over,
 * also removes highlight when user removes hover
 * @param {MouseEvent} e 
 */
function highlightItem(e) {
	if (e.type === 'mouseover') {
		e.target.classList.add('highlighted');
	}
	else if (e.type == 'mouseout') {
		e.target.classList.remove('highlighted');
	}
}

/**
 * populates input with clicked element's inner text
 * 
 * @param {Event} e 
 */
function useSuggestion(e) {
	suggestions.innerHTML = '';
	if (e.target.tagName === 'LI') { 	// if user clicks on non-bolded text
		input.value = e.target.innerText; 	
	} else {	// if user clicks on bolded text
		input.value = e.target.parentElement.innerText;	
	}
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('mouseover', highlightItem);
suggestions.addEventListener('mouseout', highlightItem)
suggestions.addEventListener('click', useSuggestion);