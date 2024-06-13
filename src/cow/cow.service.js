import Cow from "./cow.model"

export default class CowService {
    constructor(cows) {
        this.cows = cows.foreach(cow => new Cow(cow.name, cow.id, cow.birthdate, cow.pp, cow.mark, cow.isRegistered))
    }

    createCow(cow) {
        this.cows = [...this.cows, new Cow(cow.name, cow.id, cow.birthdate, cow.pp, cow.mark, cow.isRegistered)]
    }

}