import { TypeRegister, TypeRegisterId } from "../../registry.mjs";
export class TestTypeRegister extends TypeRegister {
    /**
     * @param { class | String } type
     * @param { TypeRegisterId } typeRegisterId
    */
    constructor(type, typeRegisterId) {
        super(type, typeRegisterId);
    }
}