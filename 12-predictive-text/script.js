const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// returns all fruit that have the user's input as a substring
function search(str) {
	let results = [];
	results = fruit.filter(val => (val.toLowerCase().indexOf(str) != -1));
	return results;
}

// Function that displays search bar on keyup event
function searchHandler(e) {
	const userInput = e.target.value.toLowerCase();

	// get list of fruit that match the user's search
	const fruitRemaining = search(userInput);

	// clear the outdated list from last search
	suggestions.innerHTML = '';

	// show suggestions for current search
	showSuggestions(fruitRemaining, userInput);
}

// Populates suggestions list
function showSuggestions(results, inputVal) {

	// results is all fruit that match userInput
	for (let result of results) {
		const newLi = document.createElement('li');

		//turn userInput part of result into bold 
		const boldedResult = boldSubstring(result, inputVal)
		newLi.innerHTML = boldedResult;

		suggestions.appendChild(newLi);
	}
}

// returns str with substr in bold
function boldSubstring(str, subStr) {

	// get starting and ending idx of subStr in str
	const startIdx = str.toLowerCase().indexOf(subStr);
	const endIdx = startIdx+subStr.length;

	const boldedResult = str.split('').map((val,idx) => {
		if (idx >= startIdx && idx < endIdx) {
			return `<b>${val}</b>`;
		} else {
			return val;
		}
	}).join('');
	return boldedResult;
}

// highlights the list item the user is hovering over
function highlightItem(e) {
	// TODO
}

function useSuggestion(e) {
	// TODO
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('mouseover', )
suggestions.addEventListener('click', useSuggestion);