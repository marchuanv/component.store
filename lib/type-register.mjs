import { GUID, Reflection, Store, TypeRegisterSchema, Uninitialised } from '../registry.mjs';
/**
 * @callback GetMetadata
 * @param { Object } metadata
 * @param { Object } secureContext
*/
const secureContext = {};
export class UnresolvedType { }
export class UnknownType { }
export class TypeRegister extends Store {
    /**
     * @param { Object } type
     * @param { GUID } typeRegisterId
     * @param { TypeRegisterSchema } typeRegisterSchema
     * @param { Object } metadata
    */
    constructor(type = UnknownType, typeRegisterId = null, typeRegisterSchema = new TypeRegisterSchema(), metadata = null) {
        const _typeRegisterId = typeRegisterId;
        if (_typeRegisterId !== null && _typeRegisterId !== undefined && !(_typeRegisterId instanceof GUID)) {
            throw new Error(`The typeRegisterId is not an instance of a GUID`);
        }
        if (metadata !== undefined && metadata !== null && typeof metadata !== 'object' && Object.keys(metadata) === 0) {
            throw new Error('The metadata argument is not an object.');
        }
        if (type === UnknownType && (_typeRegisterId === null || _typeRegisterId === undefined)) {
            throw new Error('The type argument is unknown.');
        }
        const _metadata = {};
        _metadata.Id = typeRegisterId;
        if (_metadata.Id === null || _metadata.Id === undefined) {
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
            if (metadata) {
                for (const { key } of typeRegisterSchema.schema) {
                    _metadata[key] = metadata[key];
                }
            }
            _metadata.Id = new GUID(_metadata);
            super(_metadata.Id, typeRegisterSchema.schema, secureContext);
            try {
                super.set(_metadata, secureContext);
            } catch (error) {
                console.log(error);
                throw new Error(`unable to register ${_metadata.name}`)
            }
        } else {
            super(_metadata.Id, typeRegisterSchema.schema, secureContext);
            if (metadata) {
                //sync with what is in the store
                const originalMetadata = super.get(secureContext);
                for (const { key } of typeRegisterSchema.schema) {
                    metadata[key] = originalMetadata[key];
                }
            }
        }
    }
    /**
     * @returns { GUID }
    */
    get Id() {
        const { Id } = super.get(secureContext);
        if (Id instanceof Uninitialised) {
            throw new Error('Critical Error');
        }
        return Id;
    }
    /**
     * @returns { String | Uninitialised }
    */
    get name() {
        const { name } = super.get(secureContext);
        return name;
    }
    /**
     * @returns { Object | Uninitialised }
    */
    get type() {
        const { type } = super.get(secureContext);
        return type;
    }
    /**
     * @returns { Boolean | Uninitialised }
    */
    get isPrimitive() {
        const { isPrimitive } = super.get(secureContext);
        return isPrimitive;
    }
    /**
     * @returns { Boolean | Uninitialised }
    */
    get isClass() {
        const { isClass } = super.get(secureContext);
        return isClass;
    }
}
// new TypeRegister(String);
// new TypeRegister(Boolean);
// new TypeRegister(Number);
// new TypeRegister(Object);
// new TypeRegister(Array);
// new TypeRegister(BigInt);
// new TypeRegister(null);
// new TypeRegister('undefined');