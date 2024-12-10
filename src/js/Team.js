/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
    // TODO: write your logic here
    #members;

    constructor() {
        this.#members = new Set();
    }

    has(character) {
        return this.#members.has(character);
    }

    get members() {
        return this.#members;
    }

    add(character) {
        if (this.#members.has(character)) {
            throw new Error('Ошибка!Такой персонаж уже eсть в команде!');
        }
        this.#members.add(character);
    }

    addAll(characters) {
        this.#members = new Set([
            ...this.#members, ...characters
        ]);
    }

    delete(elem) {
        this.#members.delete(elem);
    }

    toArray() {
        return [ ...this.#members ];
    }

    [Symbol.iterator]() {
        return this.#members[Symbol.iterator]();
    }
}
