import { GUID } from '../registry.mjs';
import { Fur, Dog, TestTypeDecorator } from './index.mjs';
xdescribe('when creating a type decorator', () => {
    it(`should decorate a type with member metadata`, () => {
        try {
            const typeDecor = new TestTypeDecorator(Dog);

            expect(typeDecor.Id).toBeDefined();
            expect(typeDecor.Id).not.toBeNull();
            expect(typeDecor.Id).toBeInstanceOf(GUID);

            expect(typeDecor.type).toBeDefined();
            expect(typeDecor.type).not.toBeNull();
            expect(typeDecor.type).toBe(Dog);
            
            expect(typeDecor.name).toBeDefined();
            expect(typeDecor.name).not.toBeNull();
            expect(typeDecor.name).toBe(Dog.name);

            expect(typeDecor.isClass).toBeDefined();
            expect(typeDecor.isClass).not.toBeNull();
            expect(typeDecor.isClass).toBeTrue();

            expect(typeDecor.isPrimitive).toBeDefined();
            expect(typeDecor.isPrimitive).not.toBeNull();
            expect(typeDecor.isPrimitive).toBeFalse();

        } catch (error) {
            console.log(error);
            fail(`did not expected any errors `);
        }
    });
    it(`should get existing type with member metadata`, () => {
        try {
            let typeDecor = new TestTypeDecorator(Dog);
            const originalId = typeDecor.Id;

            expect(typeDecor.Id).toBeDefined();
            expect(typeDecor.Id).not.toBeNull();
            expect(typeDecor.Id).toBeInstanceOf(GUID);

            expect(typeDecor.type).toBeDefined();
            expect(typeDecor.type).not.toBeNull();
            expect(typeDecor.type).toBe(Dog);
            
            expect(typeDecor.name).toBeDefined();
            expect(typeDecor.name).not.toBeNull();
            expect(typeDecor.name).toBe(Dog.name);

            expect(typeDecor.isClass).toBeDefined();
            expect(typeDecor.isClass).not.toBeNull();
            expect(typeDecor.isClass).toBeTrue();

            expect(typeDecor.isPrimitive).toBeDefined();
            expect(typeDecor.isPrimitive).not.toBeNull();
            expect(typeDecor.isPrimitive).toBeFalse();

            typeDecor = new TestTypeDecorator(null, originalId);

            expect(typeDecor.Id).toBeDefined();
            expect(typeDecor.Id).not.toBeNull();
            expect(typeDecor.Id).toBeInstanceOf(GUID);

            expect(typeDecor.type).toBeDefined();
            expect(typeDecor.type).not.toBeNull();
            expect(typeDecor.type).toBe(Dog);
            
            expect(typeDecor.name).toBeDefined();
            expect(typeDecor.name).not.toBeNull();
            expect(typeDecor.name).toBe(Dog.name);

            expect(typeDecor.isClass).toBeDefined();
            expect(typeDecor.isClass).not.toBeNull();
            expect(typeDecor.isClass).toBeTrue();

            expect(typeDecor.isPrimitive).toBeDefined();
            expect(typeDecor.isPrimitive).not.toBeNull();
            expect(typeDecor.isPrimitive).toBeFalse();


        } catch (error) {
            console.log(error);
            fail(`did not expected any errors `);
        }
    });
});