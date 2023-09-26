const fetchParams = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
export async function fetchMovies(categoryName, pageSize, page = null) {
    try {
        const url = categoryName === 'best'
            ? `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=${pageSize}&page=${page ?? '1'}`
            : `http://localhost:8000/api/v1/titles/?genre=${categoryName}&sort_by=-imdb_score&page_size=${pageSize}&page=${page ?? '1'}`;
        const response = await fetch(url, fetchParams);
        return await response.json();
    }
    catch (e) {
        console.log(e);
        return null;
    }
}
export async function fetchHeroMovie() {
    try {
        const response = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=1', fetchParams);
        return await response.json();
    }
    catch (e) {
        console.log(e);
        return null;
    }
}
