// Listen for omnibox input
chrome.omnibox.onInputEntered.addListener(function(text) {
  // Perform bookmark search based on the input text
  searchBookmarks(text);
});

// Function to search bookmarks
function searchBookmarks(query) {
  chrome.bookmarks.search(query, function(results) {
      // Process search results
      if (results && results.length > 0) {
          // Do something with the results, like displaying them in the popup
          // or opening them in a new tab
          console.log(results);
      } else {
          // Handle case when no bookmarks match the query
          console.log("No bookmarks found for the query: " + query);
      }
  });
}