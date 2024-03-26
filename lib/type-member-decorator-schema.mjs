import { TypeDecoratorSchema } from "../registry.mjs";
export class TypeMemberDecoratorSchema extends TypeDecoratorSchema {
    /**
     * @param {Array<{ key: String, type: Object }>} properties
    */
    constructor(properties = []) {
        properties = properties.concat([{
            key: 'memberName',
            type: String
        }, {
            key: 'memberType',
            type: Object
        }]);
        super(properties);
    }
}