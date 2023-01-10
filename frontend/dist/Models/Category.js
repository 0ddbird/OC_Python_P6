class Category {
    constructor(name, title, movies, DOMElement = null) {
        this.name = name;
        this.title = title;
        this.movies = movies;
        this.DOMElement = DOMElement;
        this.root = document.querySelector('#categories');
    }
    setMovies(movies) {
        this.movies = movies;
    }
    buildDOM() {
        const template = document.querySelector('#template_category');
        if (template?.content == null)
            return;
        const clone = template.content.cloneNode(true);
        const titleElement = clone.querySelector('.category_title');
        const containerElement = clone.querySelector('.movies_container');
        titleElement.innerText = `${this.name
            .charAt(0)
            .toUpperCase()}${this.name.slice(1)}`;
        this.DOMElement = clone.querySelector('.category');
        this.movies.forEach((movie) => {
            movie.createThumbnail(containerElement);
        });
        this.root.appendChild(clone);
    }
}
export default Category;
