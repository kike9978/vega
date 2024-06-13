import Cow from "./cow.model"
import data from "../data/data"

export default class CowService {
    constructor() {
        this.cows = data.forEach(cow => new Cow(cow.name, cow.id, cow.birthDate, cow.opp, cow.mark, cow.isRegistered))
        console.log(this.cows)
    }

    createCow(cow) {
        console.log(cow)
        if (!this.cows) {
            this.cows = [new Cow(cow.name, cow.id, cow.birthDate, cow.opp, cow.mark, cow.isRegistered)]
            return
        }
        this.cows = [...this.cows, new Cow(cow.name, cow.id, cow.birthDate, cow.opp, cow.mark, cow.isRegistered)]
    }

    getCows() {
        return this.cows
    }

}