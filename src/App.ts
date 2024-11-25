import http, { get } from "http";
import content from "./Content";
import * as fsPromise from 'fs/promises'; 
class Program {
    constructor() {
        http.createServer(content).listen(process.env.PORT || 8080);
        fileRead();
    }
}

export let trails: string[] = [];
export let diceRolls: number[] = [];

export async function fileRead() {
    const trail = await fsPromise.open('./src/osvenyek.txt', 'r');
    for await (const line of trail.readLines()) {
        trails.push(line.split('\r\n').toString());
    }
    const diceRoll = await fsPromise.open('./src/dobasok.txt', 'r');
    for await (const line of diceRoll.readLines()) {
        line.replaceAll(' ', '').split('').forEach(roll => diceRolls.push(Number(roll)))
    }
}

export function getMaxTrailIndex(){
    return trails.indexOf(trails.find(x => x.length === Math.max(...trails.map(y => y.length)))!.toString());
}
new Program();
