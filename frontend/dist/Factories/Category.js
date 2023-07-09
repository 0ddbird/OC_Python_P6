class Category {
    constructor(name, title, movies) {
        this.name = name;
        this.title = title;
        this.movies = movies;
        this.root = document.querySelector('#categories');
    }
    setMovies(movies) {
        this.movies = movies;
    }
    buildDOMElement() {
        const template = document.querySelector('#template_category');
        if (template?.content == null)
            return;
        const clone = template.content.cloneNode(true);
        this.root.append(clone);
    }
    appendMovies() { }
}
export default Category;
