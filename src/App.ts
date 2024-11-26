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

export function getInputDiceRoll(diceRoll: number): string{
    return `\nAdja meg a játékosok számát: <input type='text' name='diceRoll' value='${diceRoll}' style='max-width:100px;' onChange='this.form.submit();'>`
}

export function printProperties(trail: number): string {
    // trails[trail].path.charCodeAt('M')
    let M_db = 0;
    let V_db = 0;
    let E_db = 0;
    for (let i = 0; i < trails[trail].path.length; i++) {
        if (trails[trail].path.charCodeAt(i) == 77) M_db++; 
        else if (trails[trail].path.charCodeAt(i) == 86) V_db++;
        else E_db++;
    }
    return `M: ${M_db} darab\nV: ${V_db} darab\nE: ${E_db} darab`;
}
new Program();
