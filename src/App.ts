import http, { get } from "http";
import content from "./Content";
import * as fsPromise from 'fs/promises'; 
import Trail from "./Trail";
import Game from "./Game";
class Program {
    constructor() {
        http.createServer(content).listen(process.env.PORT || 8080);
        fileRead().then;
    }
}

export let game: Game;

export async function fileRead() {
    const trailsData = await fsPromise.open('./src/osvenyek.txt', 'r');
    const trails: Trail[] = [];
    for await (const line of trailsData.readLines()) {
        trails.push(new Trail(line.split('\r\n').toString()));
    }
    const diceRollsData = await fsPromise.open('./src/dobasok.txt', 'r');
    const diceRolls: number[] = [];
    for await (const line of diceRollsData.readLines()) {
        line.replaceAll(' ', '').split('').forEach(roll => diceRolls.push(Number(roll)))
    }
    game = new Game(trails, diceRolls);
}

export function getMaxTrailIndex(){
    const maxTrail = game.trails.find(x => x.path.length === Math.max(...game.trails.map(y => y.path.length)));
    return maxTrail ? game.trails.indexOf(maxTrail) : -1;
}

export function getInputTrail(): string{
    return `\nAdja meg egy ösvény sorszámát: <input type='text' name='trail' value='${game.selectedTrail}' style='max-width:100px;' onChange='this.form.submit();'>`
}

export function getInputPlayerNumber(): string{
    return `\nAdja meg a játékosok számát: <input type='text' name='playerNumber' value='${game.players.size}' style='max-width:100px;' onChange='this.form.submit();'>`
}

export function printProperties(): string {
    // trails[trail].path.charCodeAt('M')
    let M_db = 0;
    let V_db = 0;
    let E_db = 0;
    for (let i = 0; i < game.trails[game.selectedTrail].path.length; i++) {
        if (game.trails[game.selectedTrail].path.charCodeAt(i) == 77) M_db++; 
        else if (game.trails[game.selectedTrail].path.charCodeAt(i) == 86) V_db++;
        else E_db++;
    }
    return `M: ${M_db} darab\nV: ${V_db} darab\nE: ${E_db} darab`;
}
new Program();

export function printSimpleTrailGame(): string {
    game.run(true);
    const winners = game.getWinners(game.players);
    let winnersString = `A játék a(z) ${game.finishedOnRound}. körben fejeződött be. A legtávolabb jutó(k) sorszáma: `;
    winners.forEach((value: any, key: any) => {
        winnersString += `${key} `;
    });
    return winnersString;
}

export function printGame(): string {
    game.run(false);
    const winners = game.getWinners(game.players);
    let winnersString = 'Nyertesek (ek): ';
    winners.forEach((value: any, key: any) => {
        winnersString += `${key} `;
    });
    winnersString += '\nA többiek pozíciója:'
    game.players.forEach((value: any, key: any) => {
        if(!winners.has(key)){
            winnersString += `\n${key}. játékos, ${value}. mező`;
        }
        ;
    });
    return winnersString;
}
