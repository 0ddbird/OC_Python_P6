export async function fetchMovies(categoryName, pages) {
    const fetchParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:8000/api/v1/titles/?genre=${categoryName}&sort_by=-imdb_score&page_size=${pages}`, fetchParams);
        return await response.json();
    }
    catch (e) {
        console.log(e);
        return null;
    }
}
