import crypto from 'node:crypto';
import { TestStore } from './index.mjs';
import { Schema } from '../lib/schemas.mjs';
const schema = new Schema();
describe('when constructing stores given metadata and secure context', () => {
    it(`should get the same data for the same metadata and secure context`, () => {
        const secureContext = {};
        const metadata = { Id: crypto.randomUUID() };
        try {
            const store1 = new TestStore(metadata, secureContext, schema, {});
            const store2 = new TestStore(metadata, secureContext, schema, {});

            store1.set({  }, secureContext);
            store2.set({  }, secureContext);

            const data1 = store1.get(secureContext);
            expect(data1).toBeDefined();
            expect(data1).not.toBeNull();
            expect(data1).toEqual({  });

            const data2 = store2.get(secureContext);
            expect(data2).toBeDefined();
            expect(data2).not.toBeNull();
            expect(data2).toEqual({  });
        } catch (error) {
            console.log(error);
            fail('did not expected any errors');
        }
    });
    it(`should get different data for different metadata and the same secure context`, () => {
        const secureContext = {};
        const metadata1 = { Id: crypto.randomUUID() };
        const metadata2 = { Id: crypto.randomUUID() };
        try {
            const store1 = new TestStore(metadata1, secureContext, schema, { });
            const store2 = new TestStore(metadata2, secureContext, schema, { });

            store1.set({  }, secureContext);
            store2.set({  }, secureContext);

            const data1 = store1.get(secureContext);
            expect(data1).toBeDefined();
            expect(data1).not.toBeNull();

            const data2 = store2.get(secureContext);
            expect(data2).toBeDefined();
            expect(data2).not.toBeNull();

            expect(data1).toEqual({  });
            expect(data2).toEqual({ });

        } catch (error) {
            console.log(error);
            fail('did not expected any errors');
        }
    });
    it('should raise an error when getting data with a different secure context', () => {
        const secureContextA = {};
        const secureContextB = {};
        const metadata = { Id: crypto.randomUUID() };
        try {
            const store1 = new TestStore(metadata, secureContextA, schema, {  });
            const store2 = new TestStore(metadata, secureContextA, schema, {});
            expect(store1).toBe(store2);

            store1.set({  }, secureContextA);
            store2.set({ }, secureContextA);

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
        const metadata = { Id: crypto.randomUUID() };
        try {
            const store1 = new TestStore(metadata, secureContextA, schema, {  });
            const store2 = new TestStore(metadata, secureContextA, schema, {  });
            expect(store1).toBe(store2);

            store1.set({  }, secureContextA);
            store2.set({ }, secureContextA);

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
        const metadata = { Id: crypto.randomUUID() };
        try {
            new TestStore(metadata, invalidSecureContext, schema, {  });
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
        const metadata = { Id: crypto.randomUUID() };
        try {
            const store = new TestStore(metadata, secureContext, schema, { });
            store.set('some data', invalidSecureContext);
            fail('expected an error to be raised.');
        } catch (error) {
            console.log(error);
            expect(error).toBeDefined();
            expect(error).not.toBeNull();
            expect(error.message).toBe(`The secureContext argument is undefined, null, or not an object.`);
        }
    });
});