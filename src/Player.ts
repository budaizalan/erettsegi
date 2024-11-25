export default class Player {
    #diceRolls: number[] = [];
    #position: number = 0;

    get diceRolls() {
        return this.#diceRolls;
    }

    get position() {
        return this.#position;
    }

    set position(value: number) {
        this.#position = value;
    }

    constructor(diceRolls: number[]) {
        this.#diceRolls = diceRolls;
    }
}