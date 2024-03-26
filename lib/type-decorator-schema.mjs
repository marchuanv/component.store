import { TypeRegisterSchema } from "../registry.mjs";
export class TypeDecoratorSchema extends TypeRegisterSchema {
    /**
     * @param {Array<{ key: String, type: Object }>} schema
    */
    constructor(schema = []) {
        super(schema.concat(TypeDecoratorSchema.schema));
    }
    static get schema() {
        return [{
            key: 'members',
            type: Array
        }]
    }
}