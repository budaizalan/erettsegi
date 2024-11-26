import http, { get } from "http";
import content from "./Content";
import * as fsPromise from 'fs/promises'; 
import Trail from "./Trail";
class Program {
    constructor() {
        http.createServer(content).listen(process.env.PORT || 8080);
        fileRead().then;
    }
}

export let trails: Trail[] = [];
export let diceRolls: number[] = [];

export async function fileRead() {
    const trail = await fsPromise.open('./src/osvenyek.txt', 'r');
    for await (const line of trail.readLines()) {
        trails.push(new Trail(line.split('\r\n').toString()));
    }
    const diceRoll = await fsPromise.open('./src/dobasok.txt', 'r');
    for await (const line of diceRoll.readLines()) {
        line.replaceAll(' ', '').split('').forEach(roll => diceRolls.push(Number(roll)))
    }
}

export function getMaxTrailIndex(){
    const maxTrail = trails.find(x => x.path.length === Math.max(...trails.map(y => y.path.length)));
    return maxTrail ? trails.indexOf(maxTrail) : -1;
}

export function getInputTrail(trail: number): string{
    return `\nAdja meg egy ösvény sorszámát: <input type='text' name='trail' value='${trail}' style='max-width:100px;' onChange='this.form.submit();'>`
}

export function getInputPlayerNumber(playerNumber: number): string{
    return `\nAdja meg a játékosok számát: <input type='text' name='playerNumber' value='${playerNumber}' style='max-width:100px;' onChange='this.form.submit();'>`
}

export function printProperties(trail: number, type: string): string {
    // trails[trail].path.charCodeAt('M')
    let db = 0;
    let iter;
    if (type == "M") {
        iter = 77;
    } else if (type == "V"){
        iter = 86;
    } else {
        iter = 69;
    }
    for (let i = 0; i < trails[trail].path.length; i++) {
        if (trails[trail].path.charCodeAt(i) == iter) {
           db++; 
        }
    }
    return `${type}: ${db} darab`;
}
new Program();
