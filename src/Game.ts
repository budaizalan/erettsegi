import Trail from "./Trail";

export default class Game{
    #players: Map<number, number> = new Map();
    #trails: Trail[] = [];
    #diceRolls: number[] = [];
    #finishedOnRound: number = 0;
    #winners: number[] = [];

    get players(){
        return this.#players;
    }

    get trails(){
        return this.#trails;
    }

    get diceRolls(){
        return this.#diceRolls;
    }

    get finishedOnRound(){
        return this.#finishedOnRound;
    }

    get winners(){
        return this.#winners;
    }

    constructor(players: number, trails: Trail[], diceRolls: number[]){
        this.#players = new Map(Array.from({length: players}, (_, i) => [i + 1, 0]));
        this.#trails = trails;
        this.#diceRolls = diceRolls
        
    }
}