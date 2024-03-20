import { GUID, Reflection, Store, Type, UnknownType } from '../registry.mjs';
import { } from './type.mjs';
export class TypeRegisterId extends GUID { }
const secureContext = {};
const schema = {
    Id: 'object',
    typeName: 'string',
    type: 'function|undefined',
    data: 'object'
};
export class TypeRegister extends Store {
    /**
     * @param { TypeRegisterId } typeRegisterId
     * @param { Object } type
    */
    constructor(typeRegisterId, type = Type.UnknownType) {
        if (new.target === TypeRegister) {
            throw new Error(`${TypeRegister.name} is an abstract class.`);
        }
        const found = (new Type()).get({ name: type, type });
        const _type = found.type;
        let _typeRegisterId = null;
        if (!typeRegisterId) {
            _typeRegisterId = new TypeRegisterId({ _type });
        }
        super({ _typeRegisterId }, secureContext, schema, {
            Id: _typeRegisterId,
            typeName: found.name,
            type: _type,
            data: {}
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
     * @template T
     * @param { T } prototype class or type prototype
     * @returns { T } data
    */
    get(prototype) {
        const { data } = super.get(secureContext);
        if (Reflection.typeMatch(prototype, data)) {
            return data;
        }
        throw new Error(`The data type does not match the prototype argument.`);
    }
    /**
     * @param { Object } data
    */
    set(data) {
        const store = super.get(secureContext);
        store.data = data;
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended.filter(x => x !== TypeRegister);
    }
}