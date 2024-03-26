import { GUID, Reflection, TypeDecorator, TypeMemberDecoratorSchema, TypeRegister, Uninitialised, UnknownType } from '../registry.mjs';
/**
 * @callback GetMetadata
 * @param { Object } metadata
 * @param { Object } secureContext
*/
let _secureContext = null;
export class TypeMemberDecorator extends TypeDecorator {
    /**
     * @param { class } type
     * @param { GUID } typeDecoratorId
     * @param { String } memberName
     * @param { class } memberType
    */
    constructor(type = UnknownType, typeDecoratorId = null, memberName = "", memberType = UnknownType) {
        if (typeDecoratorId !== null && typeDecoratorId !== undefined && !(typeDecoratorId instanceof GUID)) {
            throw new Error(`The typeDecoratorId is not an instance of a GUID`);
        }
        if (typeDecoratorId === null || typeDecoratorId === undefined) {
            if (memberName === null || memberName === undefined || Reflection.isEmptyString(memberName)) {
                throw new Error(`The memberName argument is not provided.`);
            }
            if (memberType === null || memberType === undefined || memberType === UnknownType) {
                throw new Error(`The memberType argument is not provided.`);
            }
        }
        super(type, typeDecoratorId, new TypeMemberDecoratorSchema(), (metadata, secureContext) => {
            if (!_secureContext) {
                _secureContext = secureContext;
            }
            if (metadata.memberName instanceof Uninitialised || metadata.memberType instanceof Uninitialised) {
                const _memberName = memberName.toLowerCase().replace(/\s/g, '');
                const member = metadata.members.find(x => x.name === _memberName || x.name === metadata.memberName);
                if (member === undefined) {
                    throw new Error(`${_memberName} member not found for ${super.name} type.`);
                }
                metadata.memberName = _memberName;
                metadata.memberType = new TypeRegister(memberType);
            }
        });
    }
    /**
     * @return { String }
    */
    get memberName() {
        const { memberName } = super.get(_secureContext);
        return memberName;
    }
    /**
     * @return { class }
    */
    get memberType() {
        const { memberType } = super.get(_secureContext);
        return memberType;
    }
}