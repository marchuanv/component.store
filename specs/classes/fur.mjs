export class Fur  {
    /**
     * @returns { String }
    */
    get colour() {
        return Property.get({ isAdultFood: null }, String);
    }
}