import { Specs } from '../registry.mjs';
export { Animal } from './classes/animal.mjs';
export { Dog } from './classes/dog.mjs';
export { Fur } from './classes/fur.mjs';
export { ID_TypeRegister } from './classes/id-type-register.mjs';
export { TestTypeRegister } from './classes/test-type-register.mjs';
export { TestTypeMemberDecorator } from './classes/test-type-member-decorator.mjs';
export { TestTypeDecorator } from './classes/test-type-decorator.mjs';
export { TestStore } from './classes/test-store.mjs';
const specs = new Specs(60000, './');
specs.run();