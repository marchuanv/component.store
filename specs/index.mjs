import { Specs } from '../registry.mjs';
export { Animal } from './classes/animal.mjs';
export { Dog } from './classes/dog.mjs';
export { Fur } from './classes/fur.mjs';
export { TestStore } from './classes/test-store.mjs';
const specs = new Specs(60000, './');
specs.run();