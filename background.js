// Search bookmarks by keyword
function searchBookmarks(keyword, callback) {
	chrome.bookmarks.search(keyword, function(bookmarks) {
		const suggestions = bookmarks.map(bookmark => ({
			content: bookmark.url || "",
			description: bookmark.title || ""
		}));

		// Filter out suggestions without content
		const validSuggestions = suggestions.filter(suggestion => suggestion.content !== "");

		// Log suggestions before passing to the callback
		console.log("Suggestions:", validSuggestions);

		callback(validSuggestions);
	});
}

// Register the service worker
chrome.runtime.onInstalled.addListener(() => {
	// Register the service worker
	navigator.serviceWorker.register('service-worker.js')
		.then(registration => {
			console.log('Service worker registered successfully:', registration);
		})
		.catch(error => {
			console.error('Service worker registration failed:', error);
		});
});


// Omnibox input
chrome.omnibox.onInputEntered.addListener(function(text) {
	searchBookmarks(text, function(bookmarks) {
			// Process bookmarks
			console.log("Bookmarks matching '" + text + "':", bookmarks);
	});
});

// Keyboard shortcut command
chrome.commands.onCommand.addListener(function(command) {
	if (command === "find") {
			console.log("Find command triggered!");
	}
});