function searchBookmarks(query, suggest) {
	chrome.bookmarks.search(query, function (bookmarks) {
		if (chrome.runtime.lastError) {
			console.error("Error searching bookmarks:", chrome.runtime.lastError.message);
			return;
		}

		const suggestions = [];

		bookmarks.forEach(function (bookmark) {
			if (bookmark.title || bookmark.url) {
				const titleMatches = bookmark.title && bookmark.title.toLowerCase().includes(query.toLowerCase());
				const urlMatches = bookmark.url && bookmark.url.toLowerCase().includes(query.toLowerCase());

				if (titleMatches || urlMatches) {
					suggestions.push({
						content: bookmark.url,
						description: bookmark.title
					});
				}
			}
		});

		suggest(suggestions);

		if (suggestions.length === 0) {
			console.log("No suggestions found for query:", query);
		}
	});
}

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
	if (text.length > 0) {
		searchBookmarks(text, suggest);
	} else {
		suggest([]);
	}
});

chrome.omnibox.onInputEntered.addListener(function (text) {
	let url;

	if (text.startsWith('http') || text.startsWith('https')) {
		url = text;
	} else {
		url = 'https://www.google.com/search?q=' + encodeURIComponent(text);
	}

	console.log("Hello World");
	chrome.tabs.create({ url: url });
});