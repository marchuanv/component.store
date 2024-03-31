import { GUID, Schema, Store, TypeInfo, SecureContext } from '../registry.mjs';
describe('when constructing stores given metadata and secure context', () => {
    class TestSchema extends Schema {
        constructor() {
            super([{
                name: 'message',
                typeInfo: new TypeInfo({ type: String })
            }]);
        }
    }
    class TestStore extends Store {}
    const schema = new TestSchema();
    it(`should get the same data for the same metadata and secure context`, () => {
        const secureContext = new SecureContext();
        try {
            const store1 = new TestStore(schema, secureContext);
            const store2 = new TestStore(schema, secureContext);

            store1.set({ message: 'Hello World A' }, secureContext);
            store2.set({ message: 'Hello World B' }, secureContext);

            const data1 = store1.get(secureContext);
            expect(data1).toBeDefined();
            expect(data1).not.toBeNull();
            expect(data1).toEqual({ message: 'Hello World B' });

            const data2 = store2.get(secureContext);
            expect(data2).toBeDefined();
            expect(data2).not.toBeNull();
            expect(data2).toEqual({ message: 'Hello World B' });
        } catch (error) {
            console.log(error);
            fail('did not expected any errors');
        }
    });
    it(`should get different data for different metadata and the same secure context`, () => {
        const secureContext = new SecureContext();
        try {
            const store1 = new TestStore(schema, secureContext);
            const store2 = new TestStore(schema, secureContext);

            store1.set({ message: 'Hello World A' }, secureContext);
            store2.set({ message: 'Hello World B' }, secureContext);

            const data1 = store1.get(secureContext);
            expect(data1).toBeDefined();
            expect(data1).not.toBeNull();
            expect(data1).toEqual({ message: 'Hello World A' });

            const data2 = store2.get(secureContext);
            expect(data2).toBeDefined();
            expect(data2).not.toBeNull();
            expect(data2).toEqual({ message: 'Hello World B' });

        } catch (error) {
            console.log(error);
            fail('did not expected any errors');
        }
    });
    it(`should store and retrieve objects`, () => {
        const secureContext = new SecureContext();
        try {
            const store = new TestStore(schema, secureContext);
            store.set({ message: 'Hello World' }, secureContext);
            const data = store.get(secureContext);
            expect(data).toBeDefined();
            expect(data).not.toBeNull();
            expect(data).toEqual({ message: 'Hello World' });

        } catch (error) {
            console.log(error);
            fail('did not expected any errors');
        }
    });
    it('should raise an error when getting data with a different secure context', () => {
        const secureContextA = new SecureContext();
        const secureContextB = new SecureContext();
        try {
            const store1 = new TestStore(schema, secureContextA);
            const store2 = new TestStore(schema, secureContextA);
            expect(store1).toBe(store2);

            store1.set({ message: 'Hello World A' }, secureContextA);
            store2.set({ message: 'Hello World B' }, secureContextA);

            const data1 = store1.get(secureContextA);
            expect(data1).toBeDefined();
            expect(data1).not.toBeNull();

            const data2 = store1.get(secureContextA);
            expect(data2).toBeDefined();
            expect(data2).not.toBeNull();

            store1.get(secureContextB);
            store2.get(secureContextB);

            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error.message).toBe('StoreError: secure context is not valid.');
        }
    });
    it('should raise an error when setting data with a different secure context', () => {
        const secureContextA = new SecureContext();
        const secureContextB = new SecureContext();
        try {
            const store1 = new TestStore(schema, secureContextA);
            const store2 = new TestStore(schema, secureContextA);
            expect(store1).toBe(store2);

            store1.set({ message: 'Hello World A' }, secureContextA);
            store2.set({ message: 'Hello World B' }, secureContextA);

            const guid1Data = store1.get(secureContextA);
            expect(guid1Data).toBeDefined();
            expect(guid1Data).not.toBeNull();

            const guid2Data = store1.get(secureContextA);
            expect(guid2Data).toBeDefined();
            expect(guid2Data).not.toBeNull();

            store1.set('DifferentData1', secureContextB);
            store2.set('DifferentData2', secureContextB);

            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error.message).toBe('StoreError: secure context is not valid.');
        }
    });
    it(`should raise an error if the secure context is not an object`, () => {
        const invalidSecureContext = '';
        try {
            new TestStore(schema, invalidSecureContext);
            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error).toBeDefined();
            expect(error).not.toBeNull();
            expect(error.message).toBe(`The secureContext argument is undefined, null, or not a ${SecureContext.name}.`);
        }
    });
    it(`should raise an error when getting data and the secure context is not an object`, () => {
        const secureContext = new SecureContext();
        const invalidSecureContext = '';
        try {
            const store = new TestStore(schema, secureContext);
            store.set('some data', invalidSecureContext);
            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error).toBeDefined();
            expect(error).not.toBeNull();
            expect(error.message).toBe(`The secureContext argument is undefined, null, or not an object.`);
        }
    });
    it(`should raise an error when setting data fields that do not match the schema.`, () => {
        const secureContext = new SecureContext();
        try {
            const store = new TestStore(schema, secureContext);
            store.set({ wrongProperty: 'Hello World' }, secureContext);
            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error.message).toBe(`obj does not have the message property.`);
        }
    });
    it(`should raise an error when setting data fields that do not match the schema types.`, () => {
        const secureContext = new SecureContext();
        try {
            const store = new TestStore(schema, secureContext);
            store.set({ message: { shouldnotbeobject: {} } }, secureContext);
            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error.message).toBe(`obj does not have the message property.`);
        }
    });
});