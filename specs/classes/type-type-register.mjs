import { TypeRegister } from "../../registry.mjs";
export class Type_TypeRegister extends TypeRegister {
    /**
     * @param { class | String } type
    */
    constructor(type) {
        super(undefined, type)
    }
}