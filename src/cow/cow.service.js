import Cow from "./cow.model"
import data from "../data/data"

export default class CowService {
    constructor() {
        this.cows = data.forEach(cow => new Cow(cow.name, cow.id, cow.birthDate, cow.upp, cow.mark, cow.isRegistered, cow.breed))
        console.log(this.cows)
    }

    createCow(cow) {
        console.log(cow)
        if (!this.cows) {
            this.cows = [new Cow(cow.name, cow.id, cow.birthDate, cow.upp, cow.mark, cow.isRegistered, cow.breed)]
            return
        }
        this.cows = [...this.cows, new Cow(cow.name, cow.id, cow.birthDate, cow.upp, cow.mark, cow.isRegistered, cow.breed)]
    }

    getCows() {
        return this.cows
    }

}