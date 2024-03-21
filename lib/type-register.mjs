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
     * @param { TypeRegister } typeRegister
    */
    add(typeRegister) {
        const types = super.get(secureContext);
        types.push(typeRegister);
    }
    /**
     * @param { { name: String, type: Object } } criteria
     * @returns { TypeRegister }
    */
    find(criteria) {
        const { name, type } = criteria;
        const types = super.get(secureContext);
        let found = UnknownType;
        if (name !== undefined && name !== null && typeof name === 'string') {
            const _found = types.find(t => t.name === name);
            if (_found) {
                found = _found;
            } else {
                found = UnresolvedType;
            }
        } else if (type === UnknownType) {
            return found;
        } else if (type === undefined || type === null || typeof type === 'function') {
            const _found = types.find(t => t.type === type);
            if (_found) {
                found = _found;
            } else {
                found = UnresolvedType;
            }
        }
        return found;
    }
}
export class TypeRegister extends Store {
    /**
     * @param { Object } type
     * @param { Object } metadata
    */
    constructor(type = UnknownType, metadata = {}) {
        if (new.target === TypeRegister) {
            throw new Error(`${TypeRegister.name} is an abstract class.`);
        }
        let _metadata = metadata;
        for(const key of Object.keys(metadata)) {
            const value = metadata[key];
            _metadata[key] = value;
        }
        const typeStore = new TypeStore();
        let found = typeStore.find({ name: type, type });
        if (found === UnresolvedType) {
            const isPrimitive = Reflection.isPrimitiveType(type);
            const isClass = Reflection.isClass(type);
            const _name =
                type === undefined ? 'undefined' :
                    type === null ? 'null' :
                        typeof type === 'function' ? type.name :
                            type === 'undefined' ? type:  UnknownType.name;
            const _type = type === 'undefined' ? undefined: type;
            _metadata.name = _name;
            _metadata.type = _type;
            _metadata.isPrimitive = isPrimitive;
            _metadata.isClass = isClass;
            const Id = new TypeRegisterId(_metadata);
            super({ Id }, secureContext, TypeStore.Schema, _metadata);
            typeStore.add(this);
            found = typeStore.find(_metadata);
        } else if (found === UnknownType) {
            throw new Error('could not find or determine the type.');
        } else {
            const { name, type, isPrimitive, isClass } = found;
            _metadata.name = name;
            _metadata.type = type;
            _metadata.isPrimitive = isPrimitive;
            _metadata.isClass = isClass;
            const Id = new TypeRegisterId(_metadata);
            super({ Id }, secureContext, TypeStore.Schema, _metadata);
        }
    }
    /**
     * @returns { String }
    */
    get name() {
        const { name } = super.get(secureContext);
        return name;
    }
    /**
     * @returns { Object }
    */
    get type() {
        const { type } = super.get(secureContext);
        return type;
    }
    /**
     * @returns { Boolean }
    */
    get isPrimitive() {
        const { isPrimitive } = super.get(secureContext);
        return isPrimitive;
    }
    /**
     * @returns { Boolean }
    */
    get isClass() {
        const { isClass } = super.get(secureContext);
        return isClass;
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
export class PrimitiveTypeRegister extends TypeRegister {
    constructor(type) {
        super(type);
    }
}
new PrimitiveTypeRegister(String);
new PrimitiveTypeRegister(Boolean);
new PrimitiveTypeRegister(Number);
new PrimitiveTypeRegister(Object);
new PrimitiveTypeRegister(Array);
new PrimitiveTypeRegister(BigInt);
new PrimitiveTypeRegister(null);
new PrimitiveTypeRegister('undefined');