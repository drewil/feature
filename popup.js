document.addEventListener('DOMContentLoaded', function () {
	const searchInput = document.getElementById('searchInput');
	const resultsList = document.getElementById('resultsList');

	// Function to search bookmarks
	function searchBookmarks(query) {
		chrome.bookmarks.search(query, function (bookmarks) {
			resultsList.innerHTML = '';
			bookmarks.forEach(function (bookmark) {
				const listItem = document.createElement('li');
				listItem.textContent = bookmark.title;
				listItem.addEventListener('click', function () {
					chrome.tabs.create({ url: bookmark.url });
				});
				resultsList.appendChild(listItem);
			});
		});
	}

	// Event listener for input
	searchInput.addEventListener('input', function () {
		const query = searchInput.value.trim();
		if (query.length > 0) {
			searchBookmarks(query);
		} else {
			resultsList.innerHTML = '';
		}
	});
});