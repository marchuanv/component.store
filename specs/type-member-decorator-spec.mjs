import { TypeRegisterId } from '../registry.mjs';
import { Fur, Dog, TestTypeMemberDecorator } from './index.mjs';
fdescribe('when creating a type member decorator', () => {
    it(`should decorate a type with memeber metadata`, () => {
        try {
            const memberDecor = new TestTypeMemberDecorator(Dog, "fur", Fur);

            expect(memberDecor.Id).toBeDefined();
            expect(memberDecor.Id).not.toBeNull();
            expect(memberDecor.Id).toBeInstanceOf(TypeRegisterId);

            expect(memberDecor.type).toBeDefined();
            expect(memberDecor.type).not.toBeNull();
            expect(memberDecor.type).toBe(Dog);

            expect(memberDecor.typeName).toBeDefined();
            expect(memberDecor.typeName).not.toBeNull();
            expect(memberDecor.typeName).toBe(Dog.name);

            expect(memberDecor.memberName).toBeDefined();
            expect(memberDecor.memberName).not.toBeNull();
            expect(memberDecor.memberName).toBe('fur');

            expect(memberDecor.memberType).toBeDefined();
            expect(memberDecor.memberType).not.toBeNull();
            expect(memberDecor.memberType).toBe(Fur);

        } catch (error) {
            console.log(error);
            fail(`did not expected any errors `);
        }
    });
});