import { GUID, TypeRegister, UnknownType } from '../registry.mjs';
export class TypeDecoratorId extends GUID {}
export class TypeDecorator extends TypeRegister {
    /**
     * @param { TypeDecoratorId } typeDecoratorId
     * @param { Object } type
     * @param { Object } metadata
    */
    constructor(typeDecoratorId, type = UnknownType, metadata = {}) {
        if (new.target === TypeDecorator) {
            throw new Error(`${TypeDecorator.name} is an abstract class.`);
        }
        super(type);
    }
}