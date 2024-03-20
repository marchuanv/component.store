import { Reflection, Type, TypeRegisterId } from '../registry.mjs';
import { Animal, Dog, Type_TypeRegister } from './index.mjs';
new Type(Dog);
new Type(Animal);
describe('when registering a type', () => {
    it(`should register undefined primitive type without error`, () => {
        const { name } = Reflection.getPrimitiveTypes().find(x => x.name === 'undefined');
        try {
            const typeRegister = new Type_TypeRegister(name);
            try {
                typeRegister.get(undefined);
            } catch (error) {
                expect(error.message).toBe('The data argument is null, undefined or not an instance of undefined');
            }

            expect(typeRegister.Id).toBeDefined();
            expect(typeRegister.Id).not.toBeNull();
            expect(typeRegister.Id).toBeInstanceOf(TypeRegisterId);

            expect(typeRegister.type).not.toBeNull();
            expect(typeRegister.type).not.toBeDefined();

            expect(typeRegister.typeName).toBeDefined();
            expect(typeRegister.typeName).not.toBeNull();
            expect(typeRegister.typeName).toBe('undefined');
        } catch (error) {
            console.log(error);
            fail(`did not expected any errors when registering an undefined primitive type.`);
        }
    });
    it(`should register null primitive type without error`, () => {
        const { name } = Reflection.getPrimitiveTypes().find(x => x.name === 'null');
        try {
            const typeRegister = new Type_TypeRegister(name);
            try {
                typeRegister.get(null);
            } catch (error) {
                expect(error.message).toBe('The data argument is null, undefined or not an instance of null');
            }

            expect(typeRegister.Id).toBeDefined();
            expect(typeRegister.Id).not.toBeNull();
            expect(typeRegister.Id).toBeInstanceOf(TypeRegisterId);

            expect(typeRegister.type).toBeDefined();
            expect(typeRegister.type).toBeNull();

            expect(typeRegister.typeName).toBeDefined();
            expect(typeRegister.typeName).not.toBeNull();
            expect(typeRegister.typeName).toBe('null');
        } catch (error) {
            console.log(error);
            fail(`did not expected any errors when registering an undefined primitive type.`);
        }
    });
    it(`should register primitive types without error`, () => {
        for (const { name, type } of Reflection.getPrimitiveTypes().filter(x => x.name !== 'undefined' && x.name !== 'null')) {
            try {
                const typeRegister = new Type_TypeRegister(type);
                try {
                    typeRegister.get(null);
                } catch (error) {
                    expect(error.message).toBe('The data argument is null, undefined or not an instance of null');
                }

                expect(typeRegister.Id).toBeDefined();
                expect(typeRegister.Id).not.toBeNull();
                expect(typeRegister.Id).toBeInstanceOf(TypeRegisterId);

                expect(typeRegister.type).toBe(type);
                expect(typeRegister.type).not.toBeNull();

                expect(typeRegister.typeName).toBeDefined();
                expect(typeRegister.typeName).not.toBeNull();
                expect(typeRegister.typeName).toBe(name);
            } catch (error) {
                console.log(error);
                fail(`did not expected any errors when registering ${name}`);
            }
        }
    });
    it(`should register class types without error`, () => {
        try {
            const typeRegister = new Type_TypeRegister(Dog);
            try {
                typeRegister.get(null);
            } catch (error) {
                expect(error.message).toBe('The data argument is null, undefined or not an instance of null');
            }

            expect(typeRegister.Id).toBeDefined();
            expect(typeRegister.Id).not.toBeNull();
            expect(typeRegister.Id).toBeInstanceOf(TypeRegisterId);

            expect(typeRegister.type).toBeDefined();
            expect(typeRegister.type).not.toBeNull();
            expect(typeRegister.type).toBe(Dog);

            expect(typeRegister.typeName).toBeDefined();
            expect(typeRegister.typeName).not.toBeNull();
            expect(typeRegister.typeName).toBe(Dog.name);
        } catch (error) {
            console.log(error);
            fail(`did not expected any errors when registering ${Dog.name}`);
        }
    });
    it(`should get additional data without error`, () => {
        try {
            const typeRegister = new Type_TypeRegister(Animal);

            expect(typeRegister.Id).toBeDefined();
            expect(typeRegister.Id).not.toBeNull();
            expect(typeRegister.Id).toBeInstanceOf(TypeRegisterId);

            expect(typeRegister.type).toBeDefined();
            expect(typeRegister.type).not.toBeNull();
            expect(typeRegister.type).toBe(Animal);

            expect(typeRegister.typeName).toBeDefined();
            expect(typeRegister.typeName).not.toBeNull();
            expect(typeRegister.typeName).toBe(Animal.name);

            typeRegister.set({ data: 'some data' })
            const data = typeRegister.get(Object);

            expect(data).toBeDefined();
            expect(data).not.toBeNull();
            expect(data).toBeInstanceOf(Object);

        } catch (error) {
            console.log(error);
            fail(`did not expected any errors when registering ${Dog.name}`);
        }
    });
    it(`should raise an error if no type is provided`, () => {
        try {
            new Type_TypeRegister();
            fail('expected an error');
        } catch (error) {
            console.log(error);
            expect(error.message).toBe(`could not find type.`);
        }
    });
});