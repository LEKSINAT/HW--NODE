export default class BaseModel {
  constructor() {
    if (new.target === BaseModel) {
      throw new Error('BaseModel is abstract and cannot be instantiated directly');
    }

    this.#ensureImplementation(['get', 'create', 'update', 'delete', 'find']);
  }

  #ensureImplementation(methods) {
    for (const method of methods) {
      if (this[method] === BaseModel.prototype[method]) {
        throw new Error(
          `${this.constructor.name} must implement the "${method}" method`
        );
      }
    }
  }

  async get() {
    throw new Error('Abstract method "get" must be implemented');
  }

  async create() {
    throw new Error('Abstract method "create" must be implemented');
  }

  async update() {
    throw new Error('Abstract method "update" must be implemented');
  }

  async delete() {
    throw new Error('Abstract method "delete" must be implemented');
  }

  async find() {
    throw new Error('Abstract method "find" must be implemented');
  }
}
