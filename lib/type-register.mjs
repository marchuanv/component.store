import { GUID, Store, Type, UnknownType } from '../registry.mjs';
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
    constructor(typeRegisterId = null, type = Type.UnknownType) {
        if (new.target === TypeRegister) {
            throw new Error(`${TypeRegister.name} is an abstract class.`);
        }
        let _typeRegisterId = typeRegisterId;
        if (_typeRegisterId !== null && _typeRegisterId !== undefined) {
            if (!(_typeRegisterId instanceof TypeRegisterId)) {
                throw new Error(`The typeRegisterId argument is not a ${TypeRegisterId.name}.`);
            }
            super({ _typeRegisterId }, secureContext, schema);
            if (super.get(secureContext)) {
                return;
            }
            _typeRegisterId = null;
        }
        const found = (new Type()).get({ name: type, type });
        if (found instanceof UnknownType) {
            throw new Error('could not find type.');
        }
        const _type = found.type;
        if (_type === UnknownType) {
            throw new Error('could not find type.');
        }
        if (_typeRegisterId === null || _typeRegisterId === undefined) {
            _typeRegisterId = typeRegisterId;
        }
        if (_typeRegisterId === null || _typeRegisterId === undefined) {
            _typeRegisterId = new TypeRegisterId({ type: _type });
        }
        if (typeRegisterId === null || typeRegisterId === undefined) {
            super({ _typeRegisterId }, secureContext, schema);
        }
        if (!super.exists) {
            super.set({
                Id: _typeRegisterId,
                typeName: found.name,
                type: _type,
                data: null
            }, secureContext);
        }
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
     * @param { T } type
     * @returns { T } data
    */
    get(type) {
        const { data } = super.get(secureContext, type);
        if (data === null || data === undefined || !(data instanceof type)) {
            throw new Error(`The data argument is null, undefined or not an instance of ${type}`);
        }
        return data;
    }
    /**
     * @param { Object } data
    */
    set(data) {
        const store = super.get(secureContext);
        if (data === null || data === undefined || typeof data !== 'object') {
            throw new Error('The data argument is null, undefined or not an object.');
        }
        store.data = data;
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended.filter(x => x !== TypeRegister);
    }
}