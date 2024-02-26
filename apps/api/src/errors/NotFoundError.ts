/** Not Found Error */
export class NotFoundError extends Error {
  constructor() {
    super('Not Found');
    this.name = 'NotFoundError';
  }
}
