export default class Trail {
  #path: string = '';

  get path() {
    return this.#path;
  }

    constructor(path: string) {
        this.#path = path;
    }
}