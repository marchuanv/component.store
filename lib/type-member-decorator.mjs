import { TypeDecorator, UnknownType, TypeDecoratorId } from '../registry.mjs';
export class TypeMemberDecoratorId extends TypeDecoratorId {}
export class TypeMemberDecorator extends TypeDecorator {
    /**
     * @param { TypeMemberDecoratorId } typeMemberDecoratorId
     * @param { class | UnknownType } type
     * @param { String } memberName
     * @param { class | UnknownType } memberType
    */
    constructor(typeMemberDecoratorId, type = new UnknownType(), memberName = "", memberType = new UnknownType()) {
        if (new.target === TypeMemberDecorator) {
            throw new Error(`${TypeMemberDecorator.name} is an abstract class.`);
        }
        super(typeMemberDecoratorId, type, { memberName, memberType });
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