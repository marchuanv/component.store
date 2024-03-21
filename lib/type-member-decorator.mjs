import { TypeRegisterId, Type, TypeRegister } from '../registry.mjs';
const secureContext = {};
const typeLookup = new Type();
export class TypeMemberDecorator extends TypeRegister {
    /**
     * @param { TypeRegisterId } typeMemberDecoratorId
     * @param { class } type
     * @param { String } memberName
     * @param { class } memberType
    */
    constructor(typeRegisterId, type, memberName = "", memberType = Type.UnknownType) {
        if (new.target === TypeMemberDecorator) {
            throw new Error(`${TypeMemberDecorator.name} is an abstract class.`);
        }
        const found = typeLookup.get({ name: memberType, type: memberType });
        super(typeRegisterId, type, { memberName, memberType: found.type });
    }
    /**
     * @return { String }
    */
    get memberName() {
        const { memberName } = super.metadata;
        return memberName;
    }
    /**
     * @return { class }
    */
    get memberType() {
        const { memberType } = super.metadata;
        return memberType;
    }
}