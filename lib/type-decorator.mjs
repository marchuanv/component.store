import { GUID, TypeDecoratorSchema, TypeRegister } from '../registry.mjs';
export class TypeDecorator extends TypeRegister {
    /**
     * @param { TypeInfo } typeInfo
     * @param { GUID } typeDecoratorId
     * @param { TypeDecoratorSchema } typeDecoratorSchema
     * @param { Object } metadata
    */
    constructor(typeInfo, typeDecoratorId = null, typeDecoratorSchema = new TypeDecoratorSchema(), metadata = {}) {
        if (typeDecoratorId !== null && typeDecoratorId !== undefined && !(typeDecoratorId instanceof GUID)) {
            throw new Error(`The typeDecoratorId is not an instance of a GUID`);
        }
        super(typeInfo, typeDecoratorId, typeDecoratorSchema, metadata);
    }
}