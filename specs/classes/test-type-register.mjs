import { TypeRegister } from "../../registry.mjs";
export class TestTypeRegister extends TypeRegister {
    /**
     * @param { class | String } type
    */
    constructor(type) {
        super(type);
    }
}