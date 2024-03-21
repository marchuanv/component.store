import { Fur } from "./fur.mjs";
export class Dog {
    /**
     * @returns { String }
    */
    get name() {
        return super.get({ name: null }, String);
    }
    /**
     * @param { String } value
    */
    set name(value) {
        super.set({ name: value }, String);
    }
    /**
     * @returns { Number }
    */
    get age() {
        return super.get({ age: null }, Number);
    }
    /**
     * @param { Number } value
    */
    set age(value) {
        super.set({ age: value }, Number);
    }
    /**
     * @returns { Number }
    */
    get weight() {
        return super.get({ weight: null }, Number);
    }
    /**
     * @param { Number } value
    */
    set weight(value) {
        super.set({ weight: value }, Number);
    }
    /**
     * @returns { Fur }
    */
    get fur() {
        return super.get({ fur: null }, Fur);
    }
    /**
     * @param { Food } value
    */
    set fur(value) {
        super.set({ fur: value }, Fur);
    }
    /**
     * @param { Number } meters
    */
    walk(meters) { }
    /**
     * @returns { Boolean }
    */
    isExhausted() { }
}