
//Filters
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('buscar');
    const sortSelect = document.getElementById('ordenar');
    const priceRange = document.getElementById('price-range');
    const resetBtn = document.getElementById('reset-filters');
    
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            updateQueryString();
        }
    });
    sortSelect.addEventListener('change', function() {
        updateQueryString();
    });
    priceRange.addEventListener('input', function() {
        updateQueryString();
    });
    resetBtn.addEventListener('click', () => {
        searchInput.value = '';
        sortSelect.selectedIndex = 0;
        priceRange.value = priceRange.max;
        window.location.href = '/shop';
    });
    
    function updateQueryString() {
        let search = searchInput.value.trim();
        let sort = sortSelect.value;
        let price = priceRange.value;

        let queryParams = [];
        if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
        if (sort && sort != '') queryParams.push(`sort=${encodeURIComponent(sort)}`);
        if (price !== priceRange.max) {
            queryParams.push(`price=${encodeURIComponent(price)}`);
        }
        const newUrl = '/shop?' + queryParams.join('&');
        history.pushState(null, '', newUrl);
    }
});
