export default class Task {
    constructor({title, description, category}) {
        this.id = Math.floor(Math.random() * 10000),
        this.title = title,
        this.description = description,
        this.category = category
    }
}