// Function to search bookmarks and suggest results
function searchBookmarks(query, suggest) {
	chrome.bookmarks.search(query, function(bookmarks) {
		if (chrome.runtime.lastError) {
			console.error("Error searching bookmarks:", chrome.runtime.lastError.message);
			return;
		}

		const suggestions = [];

		bookmarks.forEach(function(bookmark) {
			console.log("Title:", bookmark.title);
			console.log("URL:", bookmark.url);

			if (bookmark.title && bookmark.url) {
				suggestions.push({
					content: bookmark.url,
					description: bookmark.title
				});
			}
		});

		// Suggest all bookmarks
		console.log("Suggestions:", suggestions);
		suggest(suggestions);
	});
}

// Register omnibox handler
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
	searchBookmarks(text, suggest);
});

// Handle omnibox input
chrome.omnibox.onInputEntered.addListener(function(text) {
	if (text.startsWith('http') || text.startsWith('https')) {
		chrome.tabs.create({ url: text });
	}
});