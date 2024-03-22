import { GUID, Reflection, Store } from '../registry.mjs';
const secureContext = {};
class TypeStore extends Store {
    constructor() {
        if (new.target !== TypeStore) {
            throw new Error(`${TypeStore.name} is a sealed class.`);
        }
        super({ type: TypeStore }, secureContext, TypeStore.Schema, []);
    }
    static get Schema() {
        return {
            name: 'string',
            type: 'any|undefined|null',
            isPrimitive: 'bool',
            isClass: 'bool',
            Id: 'string'
        };
    }
    /**
     * @param { String } name
     * @param { Object } type
     * @param { Boolean } isPrimitive
     * @param { Boolean  } isClass
     * @param { GUID } Id
    */
    add(name, type, isPrimitive, isClass, Id) {
        const types = super.get(secureContext);
        types.push({ name, type, isPrimitive, isClass, Id });
    }
    /**
     * @param { { name: String, type: Object, Id: String } } criteria
     * @returns { TypeRegister }
    */
    find(criteria) {
        const { name, type, Id } = criteria;
        const types = super.get(secureContext);
        let found = UnknownType;
        if (Id !== null && Id !== undefined && Id instanceof GUID) {
            const _found = types.find(t => t.Id === Id);
            if (_found) {
                found = _found;
            } else {
                found = UnresolvedType;
            }
        } else if (name !== undefined && name !== null && typeof name === 'string') {
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
     * @param { GUID } typeRegisterId
     * @param { Object } metadata
    */
    constructor(type = UnknownType, typeRegisterId = null, metadata = {}) {
        if (typeRegisterId !== null && typeRegisterId !== undefined && !(typeRegisterId instanceof GUID)) {
            throw new Error(`The typeRegisterId is not an instance of a GUID`);
        }
        const schemaKeys = Object.keys(TypeStore.Schema);
        let metadataKeys = Object.keys(metadata);
        if (metadataKeys.some(metaKey => schemaKeys.find(schemakey => schemakey === metaKey))) {
            throw new Error(`overriding schema not allowed.`)
        }
        let _metadata = metadata;
        Object.assign(_metadata, metadata);
        const typeStore = new TypeStore();
        let found = typeStore.find({ name: type, type });
        if (found === UnresolvedType) {
            if (typeRegisterId !== null && typeRegisterId !== undefined) {
                throw new Error(`${typeRegisterId} is not registered.`);
            }
            const isPrimitive = Reflection.isPrimitiveType(type);
            const isClass = Reflection.isClass(type);
            const name =
                type === undefined ? 'undefined' :
                    type === null ? 'null' :
                        typeof type === 'function' ? type.name :
                            type === 'undefined' ? type : UnknownType.name;
            const _type = type === 'undefined' ? undefined : type;
            _metadata.name = name;
            _metadata.type = _type;
            _metadata.isPrimitive = isPrimitive;
            _metadata.isClass = isClass;
            _metadata.Id = new GUID(_metadata);
            super({ type: TypeRegister, Id: _metadata.Id }, secureContext, TypeStore.Schema, _metadata);
            typeStore.add(name, _type, isPrimitive, isClass, _metadata.Id);
            found = typeStore.find({ name, type: _type, Id: _metadata.Id });
        } else if (found === UnknownType && (typeRegisterId === null || typeRegisterId === undefined)) {
            throw new Error('could not find or determine the type.');
        } else {
            if (typeRegisterId === null || typeRegisterId === undefined) {
                super({ type: TypeRegister, Id: found.Id }, secureContext, TypeStore.Schema, {});
            } else {
                super({ type: TypeRegister, Id: typeRegisterId }, secureContext, TypeStore.Schema, {});
            }
        }
        _metadata = super.get(secureContext);
        Object.assign(metadata, _metadata);
        Object.assign(_metadata, metadata);
        super.set(_metadata, secureContext)
    }
    /**
     * @returns { GUID }
    */
    get Id() {
        const { Id } = super.get(secureContext);
        return Id;
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