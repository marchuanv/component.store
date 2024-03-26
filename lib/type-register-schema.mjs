import { GUID, Store } from "../registry.mjs";
const secureContext = {};
export class TypeRegisterSchema extends Store {
    /**
     * @param { Array<{ key: String, type: Object }> } schema describes that data that the store will be working with
    */
    constructor(schema = []) {
        const _schema = schema.concat(TypeRegisterSchema.schema);
        const Id = new GUID();
        super(Id, _schema, secureContext);
    }
    get schema() {
        return TypeRegisterSchema.schema;
    }
    static get schema() {
        return [{
            key: 'name',
            type: String
        }, {
            key: 'type',
            type: Function
        }, {
            key: 'type',
            type: null
        }, {
            key: 'type',
            type: undefined
        }, {
            key: 'isPrimitive',
            type: Boolean
        }, {
            key: 'isClass',
            type: Boolean
        }, {
            key: 'Id',
            type: GUID
        }];
    }
}