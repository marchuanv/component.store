import { TypeInfo, TypeRegisterSchema } from "../registry.mjs";
export class TypeDecoratorSchema extends TypeRegisterSchema {
    /**
     * @param {Array<{ key: String, type: Function }>} properties
    */
    constructor(properties = []) {
        super(properties.concat([{
            name: 'members',
            typeInfo: new TypeInfo({ type: Array })
        }]));
    }
}