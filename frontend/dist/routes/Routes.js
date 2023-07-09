const routes = {
    base: 'http://localhost:8000/api/v1/titles/',
    best: '?sort_by=-imdb_score&page_size=',
    action: '?genre=action&sort_by=-imdb_score&page_size=',
    comedy: '?genre=comedy&sort_by=-imdb_score&page_size=',
    romance: '?genre=romance&sort_by=-imdb_score&page_size=',
    genre: 'http://localhost:8000/api/v1/titles/'
};
export { routes };
