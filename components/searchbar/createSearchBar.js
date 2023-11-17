// Function to create and return the search bar
function createSearchBar() {
    var searchContainer = document.createElement('div');
    searchContainer.classList.add('search-container');

    var searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'searchInput';
    searchInput.placeholder = 'Search...';

    var searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
    searchButton.addEventListener('click', search);

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);

    return searchContainer;

    // Function to handle the search logic
    function search() {
        var searchValue = getSearchInputValue();
        var results = performSearch(searchValue);
        displayResults(results);
    }

    // Function to perform the search (replace with your actual search logic)
    function performSearch(query) {
        return "Search results for: " + query;
    }

    // Function to display the search results
    function displayResults(results) {
        var searchResultsElement = document.getElementById('searchResults');
        searchResultsElement.innerHTML = results;
    }

    // Function to get the input value from the search bar
    function getSearchInputValue() {
        return document.getElementById('searchInput').value;
    }
}