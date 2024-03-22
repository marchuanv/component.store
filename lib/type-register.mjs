import { GUID, Reflection, Store, TypeRegisterSchema } from '../registry.mjs';
const secureContext = {};
const _schema = {
    name: 'string',
    type: 'any|undefined|null',
    isPrimitive: 'bool',
    isClass: 'bool',
    Id: 'string'
}
export class UnresolvedType { }
export class UnknownType { }
export class TypeRegister extends Store {
    /**
     * @param { Object } type
     * @param { GUID } typeRegisterId
     * @param {TypeRegisterSchema} schema
     * @param { Object } metadata
    */
    constructor(type = UnknownType, typeRegisterId = null, schema = new TypeRegisterSchema(), metadata = {}) {
        const _typeRegisterId = typeRegisterId;
        if (_typeRegisterId !== null && _typeRegisterId !== undefined && !(_typeRegisterId instanceof GUID)) {
            throw new Error(`The typeRegisterId is not an instance of a GUID`);
        }
        if (Object.keys(metadata).some(metaKey => schema.exsts(metaKey))) {
            throw new Error(`overriding schema not allowed.`)
        }
        if (type === UnknownType && (_typeRegisterId === null || _typeRegisterId === undefined)) {
            throw new Error('The type argument is unknown.');
        }
        let _metadata = {};
        Object.assign(_metadata, schema);
        _metadata.Id = typeRegisterId;
        if (_typeRegisterId === null || _typeRegisterId === undefined) {
            const isPrimitive = Reflection.isPrimitiveType(type);
            const isClass = Reflection.isClass(type);
            const name =
                type === undefined || type === 'undefined' ? 'undefined' :
                    type === null || type === 'null' ? 'null' :
                        typeof type === 'function' ? type.name :
                            type === 'undefined' ? type : UnknownType.name;
            const _type = type === 'undefined' ? undefined : type === 'null' ? null : type;
            _metadata.name = name;
            _metadata.type = _type;
            _metadata.isPrimitive = isPrimitive;
            _metadata.isClass = isClass;
            _metadata.Id = new GUID(_metadata);
        }
        super({ schema, Id: _metadata.Id }, secureContext, schema, _metadata);
        Object.assign(_metadata, super.get(secureContext));
        Object.assign(metadata, _metadata);
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

new TypeRegister(String);
new TypeRegister(Boolean);
new TypeRegister(Number);
new TypeRegister(Object);
new TypeRegister(Array);
new TypeRegister(BigInt);
new TypeRegister(null);
new TypeRegister('undefined');