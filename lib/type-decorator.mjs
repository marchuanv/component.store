import { GUID, TypeRegister, UnknownType } from '../registry.mjs';
export class TypeDecoratorId extends GUID {}
export class TypeDecorator extends TypeRegister {
    /**
     * @param { Object } type
     * @param { Object } metadata
    */
    constructor(type = UnknownType, metadata = {}) {
        if (new.target === TypeDecorator) {
            throw new Error(`${TypeDecorator.name} is an abstract class.`);
        }
        metadata.Id = new TypeDecoratorId();
        super(type, metadata);
    }
}