import fs from "fs"; // https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; // https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; // https://nodejs.org/docs/latest-v14.x/api/url.html
import { game, getInputPlayerNumber, getInputTrail, getMaxTrailIndex, printGame, printProperties, printSimpleTrailGame} from "./App";

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
    game.selectedTrail = Number(params.get("trail") as string);
    game.players = parseInt(params.get("playerNumber") as string);

    res.write("2. feladat\n");
    res.write(`A dobások száma: ${game.diceRolls.length}\n`);
    res.write(`Az ösvények száma: ${game.trails.length}\n`);
    
    res.write("\n3. feladat\n");
    const maxTrailIndex = getMaxTrailIndex()
    res.write(`Az egyik leghosszabb a(z) ${maxTrailIndex + 1}. ösvény, hossza: ${game.trails[maxTrailIndex].path.length} \n`);
    
    res.write("\n4. feladat");
    res.write(`${getInputTrail()}`);
    res.write(`${getInputPlayerNumber()}`);

    res.write("\n\n5. feladat");
    res.write(`\n${printProperties()}`)

    res.write("\n\n7. feladat");
    res.write(`\n${printSimpleTrailGame()}`)
    
    res.write("\n\n8. feladat");
    res.write(`\n${printGame()}`)

    // <---- Fejezd be a kódolást

    res.write("</pre></form></body></html>");
    res.end();
}
