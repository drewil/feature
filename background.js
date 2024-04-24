// Function to search bookmarks and suggest results
function searchBookmarks(query, suggest) { // what we're looking for
	chrome.bookmarks.search(query, function(bookmarks) { // what we found
			if (chrome.runtime.lastError) {
					console.error("Error searching bookmarks:", chrome.runtime.lastError.message);
					return;
			}

			const suggestions = [];

			bookmarks.forEach(function(bookmark) {
					if (bookmark.title && bookmark.url) {
							suggestions.push({
									content: bookmark.url,
									description: bookmark.title
							});
					}
			});

			// Suggest relevant bookmarks
			console.log("Suggestions:", suggestions);
			suggest(suggestions);
	});
}

// Register omnibox handler
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
	if (text.length > 0) {
			searchBookmarks(text, suggest);
	} else {
			suggest([]); // Clear suggestions if input is empty
	}
});

// Handle omnibox input
chrome.omnibox.onInputEntered.addListener(function(text) {
	if (text.startsWith('http') || text.startsWith('https')) {
			chrome.tabs.create({ url: text });
	} else {
			chrome.tabs.create({ url: 'https://www.google.com/search?q=' + encodeURIComponent(text) });
	}
});