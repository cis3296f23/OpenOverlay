// Function to create and return the search bar
function createSearchBar(onSearch) {
    var searchContainer = document.createElement('div');
    searchContainer.classList.add('search-container');

    var searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'searchInput';
    searchInput.placeholder = 'Search...';

    var searchButton = document.createElement('button');
    searchButton.textContent = 'Search';

    searchButton.addEventListener('click', function () {
        onSearch(getSearchInputValue());
    });

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);
    searchContainer.addEventListener('keyup', function (event) {
        if (event.keyCode === 13){
            onSearch(getSearchInputValue());
        }
    });

    // Function to get the input value from the search bar
    function getSearchInputValue() {
        return document.getElementById('searchInput').value;
    }

    return searchContainer;
}