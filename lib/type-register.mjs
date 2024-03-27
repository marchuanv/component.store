import { GUID, Store, TypeInfo, TypeRegisterSchema } from '../registry.mjs';
const secureContext = new GUID();
export class TypeRegister extends Store {
    /**
     * @param { Object } type
     * @param { GUID } typeRegisterId
     * @param { TypeRegisterSchema } typeRegisterSchema
     * @param { Object } metadata
    */
    constructor(typeInfo, typeRegisterId = null, typeRegisterSchema = new TypeRegisterSchema(), metadata = null) {
        const _typeRegisterId = typeRegisterId;
        if (
            (typeInfo === null || typeInfo === undefined || !(typeInfo instanceof TypeInfo)) &&
            (_typeRegisterId === null || _typeRegisterId === undefined || !(typeRegisterId instanceof GUID))
        ) {
            throw new Error(`The typeInfo argument is null, undefined or not an instance of ${TypeInfo.name}.`);
        }
        if (metadata !== undefined && metadata !== null && typeof metadata !== 'object' && Object.keys(metadata) === 0) {
            throw new Error('The metadata argument is not an object.');
        }
        let _metadata = metadata;
        if (_metadata === null || _metadata === undefined) {
            _metadata = {};
        }
        for (const { key, type } of typeRegisterSchema.schema) {
            if (_metadata[key] === undefined) {
                if (type === TypeInfo) {
                    _metadata[key] = typeInfo;
                } else {
                    _metadata[key] = new TypeInfo({ type });
                }
            }
        }
        _metadata.Id = typeRegisterId;
        if (_metadata.Id === null || _metadata.Id === undefined) {
            _metadata.Id = new GUID(typeInfo);
            super(_metadata.Id, typeRegisterSchema.schema, secureContext);
            try {
                super.set(_metadata, secureContext);
            } catch (error) {
                console.log(error);
                throw new Error(`unable to register ${_metadata.name}`)
            }
        } else {
            super(_metadata.Id, typeRegisterSchema.schema, secureContext);
            //sync with what is in the store
            const originalMetadata = super.get(secureContext);
            for (const { key } of typeRegisterSchema.schema) {
                _metadata[key] = originalMetadata[key];
            }
        }
    }
    /**
     * @returns { GUID }
    */
    get Id() {
        const { Id } = super.get(secureContext);
        return Id;
    }
    /**
     * @returns { TypeInfo }
    */
    get typeInfo() {
        const { typeInfo } = super.get(secureContext);
        return typeInfo;
    }
    /**
     * @returns { Object }
    */
    get extended() {
        const metadata = super.get(secureContext);
        const typeRegisterSchema = new TypeRegisterSchema();
        const extendedMetadataKeys = Object.keys(metadata).filter(key => !typeRegisterSchema.schema.find(x => x.key === key));
        const extendedMetadata = {};
        for (const key of extendedMetadataKeys) {
            extendedMetadata[key] = metadata[key];
        }
        return extendedMetadata;
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