import { GUID, Reflection, TypeRegister, UnknownType } from '../registry.mjs';
export class TypeDecoratorId extends GUID {}
export class TypeDecorator extends TypeRegister {
    /**
     * @param { Object } type
    */
    constructor(type = UnknownType) {
        if (new.target === TypeDecorator) {
            throw new Error(`${TypeDecorator.name} is an abstract class.`);
        }
        const metadata = { Id: new TypeDecoratorId() };
        super(type, metadata);
        if (metadata.members === undefined) {
            metadata.members = Reflection.getClassMetadata(type);
        }
    }
}