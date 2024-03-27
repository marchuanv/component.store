import { GUID, Store } from '../registry.mjs';
describe('when constructing stores given metadata and secure context', () => {
    class TestDataSchema extends Store {
        /**
         * @param { GUID } Id identifier of schema.
         * @param { Object } secureContext allows a secure context for getting or setting data from or to the store.
        */
        constructor(Id, secureContext) {
            super(Id, [{
                key: 'message',
                type: String
            }], secureContext);
        }
    }
    it(`should get the same data for the same metadata and secure context`, () => {
        const secureContext = {};
        const Id = new GUID();
        try {
            const store1 = new TestDataSchema(Id, secureContext);
            const store2 = new TestDataSchema(Id, secureContext);

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
        const secureContext = {};
        const Id1 = new GUID();
        const Id2 = new GUID();
        try {
            const store1 = new TestDataSchema(Id1, secureContext);
            const store2 = new TestDataSchema(Id2, secureContext);

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
        const secureContext = {};
        const Id = new GUID();
        try {
            const store = new TestDataSchema(Id, secureContext);
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
        const secureContextA = {};
        const secureContextB = {};
        const Id = new GUID();
        try {
            const store1 = new TestDataSchema(Id, secureContextA);
            const store2 = new TestDataSchema(Id, secureContextA);
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
        const secureContextA = {};
        const secureContextB = {};
        const Id = new GUID();
        try {
            const store1 = new TestDataSchema(Id, secureContextA);
            const store2 = new TestDataSchema(Id, secureContextA);
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
        const Id = new GUID();
        try {
            new TestDataSchema(Id, invalidSecureContext);
            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error).toBeDefined();
            expect(error).not.toBeNull();
            expect(error.message).toBe(`The secureContext argument is undefined, null, or not an object.`);
        }
    });
    it(`should raise an error when getting data and the secure context is not an object`, () => {
        const secureContext = {};
        const invalidSecureContext = '';
        const Id = new GUID();
        try {
            const store = new TestDataSchema(Id, secureContext);
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
        const secureContext = {};
        const Id = new GUID();
        try {
            const store = new TestDataSchema(Id, secureContext);
            store.set({ wrongProperty: 'Hello World' }, secureContext);
            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error).toBeDefined();
            expect(error).not.toBeNull();
            expect(error.message.replace(/\s/g, '')).toBe(`->Themessagepropertydoesnotmatchtheschemadefinition`);
        }
    });
    it(`should raise an error when setting data fields that do not match the schema types.`, () => {
        const secureContext = {};
        const Id = new GUID();
        try {
            const store = new TestDataSchema(Id, secureContext);
            store.set({ message: { shouldnotbeobject: {} } }, secureContext);
            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error).toBeDefined();
            expect(error).not.toBeNull();
            expect(error.message.replace(/\s/g, '')).toBe(`->Themessagepropertydoesnotmatchtheschemadefinition`);
        }
    });
});