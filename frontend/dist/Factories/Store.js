class Store {
    constructor(categories = []) {
        this.categories = categories;
    }
    setCategory(category) {
        this.categories.push(category);
    }
    getCategories() {
        return this.categories;
    }
}
export default Store;
