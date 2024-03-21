import { TypeDecorator } from "../../registry.mjs";
export class TestTypeDecorator extends TypeDecorator {
    /**
     * @param { class } type
    */
    constructor(type) {
        super(type);
    }
}