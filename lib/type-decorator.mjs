import { GUID, Reflection, TypeDecoratorSchema, TypeRegister, Uninitialised, UnknownType } from '../registry.mjs';
const _schema = {
    name: 'string',
    type: 'any|undefined|null',
    isPrimitive: 'bool',
    isClass: 'bool',
    Id: 'string',
    members: 'array'
}
export class TypeDecorator extends TypeRegister {
    /**
     * @param { Object } type
     * @param { GUID } typeDecoratorId
     * @param { TypeDecoratorSchema } schema
     * @param { Object } metadata
    */
    constructor(type = UnknownType, typeDecoratorId = null, schema = new TypeDecoratorSchema(), metadata = {}) {
        if (typeDecoratorId !== null && typeDecoratorId !== undefined && !(typeDecoratorId instanceof GUID)) {
            throw new Error(`The typeDecoratorId is not an instance of a GUID`);
        }
        super(type, typeDecoratorId, schema, metadata);
        if (metadata.members instanceof Uninitialised) {
            if (typeDecoratorId !== null && typeDecoratorId !== undefined) {
                throw new Error(`CriticalError: something went wrong in the TypeRegister`);
            }
            metadata.members = Reflection.getClassMetadata(super.type);
        }
    }
}