import { TypeRegisterSchema } from "../registry.mjs";
export class TypeDecoratorSchema extends TypeRegisterSchema {
    /**
     * @param {Array<{ key: String, type: Object }>} properties
    */
    constructor(properties = []) {
        properties = properties.concat([{
            key: 'members',
            type: Array
        }]);
        super(properties);
    }
}