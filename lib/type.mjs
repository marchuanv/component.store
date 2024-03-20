import { GUID, Reflection, Store } from '../registry.mjs';
export class TypeId extends GUID { }
export class UnknownType { }
const typeStoreId = new TypeId();
const secureContext = {};
const schema = {
    name: 'string',
    type: 'any|undefined|null',
    isPrimitive: 'bool',
    isClass: 'bool'
};
export class Type extends Store {
    /**
     * @param { Object } type
    */
    constructor(type) {
        if (new.target !== Type) {
            throw new Error(`${Type.name} is a sealed class.`);
        }
        super({ typeStoreId }, secureContext, schema);
        if (super.isEmpty) {
            super.set([], secureContext);
        }
        const types = super.get(secureContext);
        const found = types.find(t => t.type === type || t.name === type);
        if (!found) {
            const isPrimitive = Reflection.isPrimitiveType(type);
            const isClass = Reflection.isClass(type);
            const _name =
                type === undefined ? 'undefined' :
                    type === null ? 'null' :
                        typeof type === 'function' ? type.name :
                            UnknownType.name;
            types.push({
                name: _name,
                type,
                isPrimitive,
                isClass
            });
        }
    }
    /**
     * @param { { name: String, type: Object } } criteria
     * @returns { { name: String, type: Object, isPrimitive: Boolean, isClass: Boolean } }
    */
    get(criteria) {
        const { name, type } = criteria;
        let found = new UnknownType();
        const types = super.get(secureContext);
        if (name !== undefined && name !== null && typeof name === 'string') {
            const _found = types.find(t => t.name === name);
            if (_found) {
                found = _found;
            }
        } else {
            const _found = types.find(t => t.type === type);
            if (_found) {
                found = _found;
            }
        }
        return found;
    }
    set() {
        throw new Error('setting types store not allowed.');
    }
    /**
     * checks if type data exists in the store
     * @returns { Boolean }
    */
    get exists() {
        return super.exists;
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended.filter(x => x !== Type);
    }
    /**
     * @returns { UnknownType }
    */
    static UnknownType() {
        return new UnknownType();
    }
}
new Type(String);
new Type(Boolean);
new Type(Number);
new Type(Object);
new Type(Array);
new Type(BigInt);
new Type(null);
new Type(undefined);
new Type(UnknownType);