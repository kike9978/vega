import Cow from "./cow.model"
import data from "../data/data"

export default class CowService {
    constructor() {
        this.cows = data.forEach(cow => new Cow(cow.name, cow.id, cow.birthDate, cow.upp, cow.mark, cow.isRegistered, cow.breed, cow.sex))
        console.log(this.cows)
    }

    createCow(cow) {
        console.log(cow)
        if (!this.cows) {
            this.cows = [new Cow(cow.name, cow.id, cow.birthDate, cow.upp, cow.mark, cow.isRegistered, cow.breed, cow.sex)]
            return
        }
        this.cows = [...this.cows, new Cow(cow.name, cow.id, cow.birthDate, cow.upp, cow.mark, cow.isRegistered, cow.breed, cow.sex)]
    }

    getCows() {
        return this.cows
    }

}