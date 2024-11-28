import Trail from "./Trail";

export default class Game{
    #trails: Trail[] = [];
    #diceRolls: number[] = [];
    #players: Map<number, number> = new Map();
    #selectedTrail: number = 0;
    #lastRound: boolean = false;
    #finishedOnRound: number = 0;

    get players(): Map<number, number>{
        return this.#players;
    }

    set players(value: number){
        if(Number.isNaN(value) || value < 2 || value > 5 || value > this.#trails.length) value = 2;
        this.#players = new Map(Array.from({length: value}, (_, i) => [i + 1, 0]));
    }

    get selectedTrail(){
        return this.#selectedTrail;
    }

    set selectedTrail(value: number){
        if(Number.isNaN(value) || value < 0 || value > this.#trails.length - 1) value = 0;
        this.#selectedTrail = value;
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

    constructor(trails: Trail[], diceRolls: number[]){
        this.#trails = trails;
        this.#diceRolls = diceRolls
        this.#players = new Map(Array.from({length: 2}, (_, i) => [i + 1, 0]));
        this.#selectedTrail = 0;
    }

    getWinners(players: Map<number, number>): Map<number, number> {
        let winners: Map<number, number> = new Map();
        players.forEach((value, key) => {
            if(value >= this.#trails[this.#selectedTrail].path.length){
                winners.set(key, value);
            }
        });
        return winners;
    }

    run(simpleTrail: boolean):void{
        this.#players = new Map(Array.from({length: this.#players.size}, (_, i) => [i + 1, 0]));
        this.#finishedOnRound = 0;
        for (let i = 0; i < this.#diceRolls.length; i++) {
            const currentPlayer = (i % this.#players.size) + 1;
            const currentScore = (this.#players.get(currentPlayer) ?? 0) + this.#diceRolls[i];
            // console.log(`Játékos: ${currentPlayer}, Dobás: ${this.#diceRolls[i]}, Jelenlegi pozíció: ${this.players.get(currentPlayer) ?? 0}, Új pozíció: ${currentScore}, Mező típusa: ${this.#trails[this.#selectedTrail].path[currentScore - 1]}`);
            if(this.#trails[this.#selectedTrail].path.length > currentScore){
                if(simpleTrail){
                    this.#players.set(currentPlayer, currentScore);
                    continue;
                } else{
                    switch(this.#trails[this.#selectedTrail].path[currentScore - 1]){
                        case 'M':
                            this.#players.set(currentPlayer, currentScore);
                            break;
                        case 'V':
                            break;
                        case 'E':
                            this.#players.set(currentPlayer, currentScore + this.#diceRolls[i]);
                            break;
                }
                }
            } else {
                this.#players.set(currentPlayer, this.#trails[this.#selectedTrail].path.length);
                if(!this.#lastRound && currentPlayer != this.#players.size){
                    this.#lastRound = true;
                } else {
                    if(currentPlayer == this.#players.size){
                        this.#finishedOnRound = (i + 1) / this.#players.size;
                        break;
                    }

                }
            }
        }
    }
}