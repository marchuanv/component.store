import { GUID, Reflection, TypeDecoratorSchema, TypeRegister, UnknownType } from '../registry.mjs';
export class TypeDecorator extends TypeRegister {
    /**
     * @param { Object } type
     * @param { GUID } typeDecoratorId
     * @param { TypeDecoratorSchema } typeDecoratorSchema
     * @param { Object } metadata
    */
    constructor(type = UnknownType, typeDecoratorId = null, typeDecoratorSchema = new TypeDecoratorSchema(), metadata = {}) {
        if (typeDecoratorId !== null && typeDecoratorId !== undefined && !(typeDecoratorId instanceof GUID)) {
            throw new Error(`The typeDecoratorId is not an instance of a GUID`);
        }
        super(type, typeDecoratorId, typeDecoratorSchema, metadata);
        if (metadata.members.length === 0) {
            metadata.members = Reflection.getClassMetadata(metadata.type);
        }
    }
    /**
     * @returns { Array }
    */
    get members() {
        return super.get(_secureContext);
    }
}