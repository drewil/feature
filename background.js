// Omnibox = Searchbox in Chrome
// Omnibox API = Chrome API to access omnibox
// Bookmark API = Chrome API to access bookmarks

function searchBookmarks(query, suggest) { // Search bookmarks and suggest matching results
	chrome.bookmarks.search(query, function (bookmarks) { // Search bookmarks
		if (chrome.runtime.lastError) { // Handle errors
			console.error("Error searching bookmarks:", chrome.runtime.lastError.message);
			return;
		}

		const suggestions = []; // store suggestions

		bookmarks.forEach(function (bookmark) { // Look through bookmarks
			if (bookmark.title || bookmark.url) { // Check for title or URL
				const titleMatches = bookmark.title && bookmark.title.toLowerCase().includes(query.toLowerCase()); // Check if query matches title or URL
				const urlMatches = bookmark.url && bookmark.url.toLowerCase().includes(query.toLowerCase());

				if (titleMatches || urlMatches) {  // Suggest bookmarks
					suggestions.push({
						content: bookmark.url,
						description: bookmark.title
					});
				}
			}
		});

		suggest(suggestions); // Show suggestions in the omnibox

		if (suggestions.length === 0) { // If no suggestions are found
			console.log("No suggestions found for query:", query);
		}
	});
}

chrome.omnibox.onInputChanged.addListener(function (text, suggest) { // Input change in omnibox
	if (text.length > 0) {
		searchBookmarks(text, suggest); // Searching bookmarks and suggested results
	} else {
		suggest([]); // Clear suggestions if input is empty
	}
});

chrome.omnibox.onInputEntered.addListener(function (text) { // Input in omnibox
	let url;

	if (text.startsWith('http') || text.startsWith('https')) { // Search URL based on input
		url = text;
	} else {
		url = 'https://www.google.com/search?q=' + encodeURIComponent(text);
	}

	console.log("Hello World");
	chrome.tabs.create({ url: url }); // Open URL in a new tab
});