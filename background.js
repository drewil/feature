// Function to search bookmarks and suggest results with pagination
function searchBookmarks(query, suggest) {
	const suggestions = [];

	// Define the maximum number of suggestions per page
	const pageSize = 10;

	// Function to suggest a page of bookmarks
	function suggestPage(pageNumber) {
			const startIndex = pageNumber * pageSize;
			const endIndex = startIndex + pageSize;

			chrome.bookmarks.search(query, function(bookmarks) {
					const bookmarksToShow = bookmarks.slice(startIndex, endIndex);

					bookmarksToShow.forEach(function(bookmark) {
							// Check if both title and URL exist, otherwise skip
							if (bookmark.title && bookmark.url) {
									suggestions.push({
											content: bookmark.url,
											description: bookmark.title
									});
							}
					});

					// If there are more bookmarks, show a "Next" option
					if (bookmarks.length > endIndex) {
							suggestions.push({
									content: 'next',
									description: 'Next >'
							});
					}

					// Suggest the current page of bookmarks
					suggest(suggestions);
			});
	}

	// Start by suggesting the first page
	suggestPage(0);
}

// Register omnibox handler
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
	searchBookmarks(text, suggest);
});

// Handle omnibox input
chrome.omnibox.onInputEntered.addListener(function(text) {
	if (text === 'next') {
			// Handle pagination if the user selects "Next" option
			// You can implement pagination logic here, e.g., by keeping track of current page number
			// and calling suggestPage with the next page number
	} else {
			chrome.tabs.create({ url: text });
	}
});