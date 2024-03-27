import { Schema, TypeInfo } from "../registry.mjs";
export class TypeRegisterSchema extends Schema {
    /**
     * @param { Array<{ key: String, type: Function }> } properties
    */
    constructor(properties = []) {
        super(properties.concat([{
            name: 'typeInfo',
            typeInfo: new TypeInfo({ type: TypeInfo })
        }]));
    }
}