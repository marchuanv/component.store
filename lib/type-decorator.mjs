import { GUID, Reflection, Store, Type, UnknownType } from '../registry.mjs';
import { } from './type-register.mjs';
export class TypeRegisterId extends GUID { }
const secureContext = {};
const schema = {
    Id: 'object',
    typeName: 'string',
    type: 'function|undefined',
    metadata: 'object'
};
export class TypeRegister extends Store {
    /**
     * @param { TypeRegisterId } typeRegisterId
     * @param { Object } type
     * @param { Object } metadata
    */
    constructor(typeRegisterId, type = Type.UnknownType, metadata) {
        if (new.target === TypeRegister) {
            throw new Error(`${TypeRegister.name} is an abstract class.`);
        }
        if (metadata === null || metadata === undefined || typeof metadata !== 'object') {
            throw new Error(`The metadata argument is null, undefined or not an object.`);
        }
        const found = (new Type()).get({ name: type, type });
        const _type = found.type;
        let _typeRegisterId = typeRegisterId;
        if (!typeRegisterId) {
            _typeRegisterId = new TypeRegisterId({ _type });
        }
        super({ _typeRegisterId }, secureContext, schema, {
            Id: _typeRegisterId,
            typeName: found.name,
            type: _type,
            metadata
        });
    }
    /**
     * @return { TypeRegisterId }
    */
    get Id() {
        const { Id } = super.get(secureContext);
        return Id;
    }
    /**
     * @return { String }
    */
    get typeName() {
        const { typeName } = super.get(secureContext);
        return typeName;
    }
    /**
     * @return { class }
    */
    get type() {
        const { type } = super.get(secureContext);
        return type;
    }
    /**
     * @return { Object }
    */
    get metadata() {
        const { metadata } = super.get(secureContext);
        return metadata;
    }
}