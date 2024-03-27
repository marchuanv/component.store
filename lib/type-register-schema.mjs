import { TypeInfo } from "../registry.mjs";
export class TypeRegisterSchema {
    /**
     * @param { Array<{ key: String, type: Object }> } schema describes that data that the store will be working with
    */
    constructor(schema = []) {
        this._schema = schema.concat(TypeRegisterSchema.schema);
    }
    /**
     * @returns { Array<{ key: String, type: Object }> }
    */
    get schema() {
        return this._schema;
    }
    /**
     * @returns { Array<{ key: String, type: Object }> }
    */
    static get schema() {
        return [{
            key: 'typeInfo',
            type: TypeInfo
        }];
    }
}