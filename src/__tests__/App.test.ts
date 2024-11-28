import { fileRead, getMaxTrailIndex, printProperties, printSimpleTrailGame, printGame, game } from "../App";

beforeAll(async () => {
    await fileRead();
});

test("fileRead initializes game correctly", async () => {
    expect(game.trails).toBeInstanceOf(Array);
    expect(game.trails.length).toBeGreaterThan(0);
    expect(game.diceRolls).toBeInstanceOf(Array);
    expect(game.diceRolls.length).toBeGreaterThan(0);
});

test("diceRolls length is correct", () => {
    expect(game.diceRolls.length).toBeGreaterThan(0);
});

test("getMaxTrailIndex returns correct index", () => {
    const maxIndex = getMaxTrailIndex();
    expect(maxIndex).toBeGreaterThanOrEqual(0);
    expect(maxIndex).toBeLessThan(game.trails.length);
});

test("printProperties returns correct counts", () => {
    const properties = printProperties();
    expect(properties).toMatch(/M: \d+ darab/);
    expect(properties).toMatch(/V: \d+ darab/);
    expect(properties).toMatch(/E: \d+ darab/);
});

test("printSimpleTrailGame returns correct winners", () => {
    const result = printSimpleTrailGame();
    expect(result).toMatch(/A játék a\(z\) \d+\. körben fejeződött be/);
    expect(result).toMatch(/A legtávolabb jutó\(k\) sorszáma:/);
});

test("printGame returns correct winners and positions", () => {
    const result = printGame();
    expect(result).toMatch(/Nyertesek \(ek\):/);
    expect(result).toMatch(/A többiek pozíciója:/);
});