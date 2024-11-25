import fs from "fs"; // https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; // https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; // https://nodejs.org/docs/latest-v14.x/api/url.html
import { diceRolls, getInputDiceRoll, getInputTrail, getMaxTrailIndex, printProperties, trails } from "./App";

export default function content(req: http.IncomingMessage, res: http.ServerResponse): void {
    // favicon.ico kérés kiszolgálása:
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        fs.createReadStream("favicon.ico").pipe(res);
        return;
    }
    // Weboldal inicializálása + head rész:
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<!DOCTYPE html>");
    res.write("<html lang='hu'>");
    res.write("<head>");
    res.write("<meta charset='utf-8'>");
    res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
    res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    res.write("<title>Jedlik Ts Template</title>");
    res.write("</head>");
    res.write("<body><form><pre>");
    const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

    // Kezd a kódolást innen -->

    res.write("2. feladat\n");
    res.write(`A dobások száma: ${diceRolls.length}\n`);
    res.write(`Az ösvények száma: ${trails.length}\n`);
    
    res.write("\n3. feladat\n");
    const maxTrailIndex = getMaxTrailIndex()
    res.write(`Az egyik leghosszabb a(z) ${maxTrailIndex + 1}. ösvény, hossza: ${trails[maxTrailIndex].path.length} \n`);
    
    res.write("\n4. feladat");
    let inputTrail: number = parseInt(params.get("trail") as string);
    let inputDiceRoll: number = parseInt(params.get("trail") as string);
    if (!inputTrail) inputTrail = 1;
    if (!inputTrail) inputDiceRoll = 1;
    // res.write(`Adja meg egy ösvény sorszámát: <input type='text' name='trail' value='${inputTrail}' style='max-width:100px;' onChange='this.form.submit();'>`)
    res.write(`${getInputTrail(inputTrail)}`);
    res.write(`${getInputDiceRoll(inputDiceRoll)}`);
    res.write("\n\n5. feladat");
    res.write(`\n${printProperties(inputTrail, "M")}`)
    res.write(`\n${printProperties(inputTrail, "V")}`)
    res.write(`\n${printProperties(inputTrail, "E")}`)
    

    // <---- Fejezd be a kódolást

    res.write("</pre></form></body></html>");
    res.end();
}
