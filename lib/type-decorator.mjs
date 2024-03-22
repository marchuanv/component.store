import { GUID, Reflection, TypeRegister, UnknownType } from '../registry.mjs';
export class TypeDecorator extends TypeRegister {
    /**
     * @param { Object } type
     * @param { GUID } typeDecoratorId
     * @param { Object } metadata
    */
    constructor(type = UnknownType, typeDecoratorId = null, metadata = {}) {
        if (typeDecoratorId !== null && typeDecoratorId !== undefined && !(typeDecoratorId instanceof GUID)) {
            throw new Error(`The typeDecoratorId is not an instance of a GUID`);
        }
        super(type, typeDecoratorId, metadata);
        if (metadata.members === undefined) {
            if (typeDecoratorId !== null && typeDecoratorId !== undefined) {
                throw new Error(`CriticalError: something went wrong in the TypeRegister`);
            }
            metadata.members = Reflection.getClassMetadata(super.type);
        }
    }
}