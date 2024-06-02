import { v4 as uuidv4 } from 'uuid';

export default class Task {
    constructor({title, description, category}) {
        this.id = uuidv4()
        this.category = category
        this.description = description,
        this.title = title
    }
}