import { GUID, Reflection, Store } from '../registry.mjs';
export class TypeRegisterId extends GUID { }
const secureContext = {};
class TypeStore extends Store {
    constructor() {
        if (new.target !== TypeStore) {
            throw new Error(`${TypeStore.name} is a sealed class.`);
        }
        super({ TypeStore }, secureContext, TypeStore.Schema, []);
    }
    static get Schema() {
        return {
            name: 'string',
            type: 'any|undefined|null',
            isPrimitive: 'bool',
            isClass: 'bool'
        };
    }
    /**
     * @param { String } name
     * @param { Object } type
     * @param { Boolean } isPrimitive
     * @param { Boolean } isClass
    */
    add(name, type, isPrimitive, isClass) {
        const types = super.get(secureContext);
        types.push({ name, type, isPrimitive, isClass });
    }
    /**
     * @param { { name: String, type: Object } } criteria
     * @returns { { name: String, type: Object, isPrimitive: Boolean, isClass: Boolean } | UnknownType }
    */
    find(criteria) {
        const { name, type } = criteria;
        const types = super.get(secureContext);
        let found = new UnknownType();
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
        if(found instanceof UnknownType) {
            throw new Error('could not find type.');
        }
        return found;
    }
}
export class TypeRegister extends Store {
    /**
     * @param { Object } type
    */
    constructor(type) {
        if (new.target === TypeRegister) {
            throw new Error(`${TypeRegister.name} is an abstract class.`);
        }
        const typeStore = new TypeStore();
        const Id = new TypeRegisterId();
        super({ Id }, secureContext, TypeStore.Schema, {   });
        const data = super.get(secureContext);
        const { types } = data;
        const found = typeStore.find({ name: type, type });
        if (found === UnresolvedType) {

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
        } else if (found === UnknownType) {
            throw new Error('could not find or determine type.');
        }
    }
    get isPrimitive() {
        const types = super.get(secureContext);
    }
    /**
     * @returns { UnknownType }
    */
    static UnknownType() {
        return new UnknownType();
    }
}
export class UnknownType extends TypeRegister {
    constructor() {
        super(UnknownType);
    }
}
export class UnresolvedType extends TypeRegister {
    constructor() {
        super(UnresolvedType);
    }
}
new TypeRegister(String);
new TypeRegister(Boolean);
new TypeRegister(Number);
new TypeRegister(Object);
new TypeRegister(Array);
new TypeRegister(BigInt);
new TypeRegister(null);
new TypeRegister(undefined);
new TypeRegister(UnknownType);
