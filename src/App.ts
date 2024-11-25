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
new Program();
